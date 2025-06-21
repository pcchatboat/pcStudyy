import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  generateChatResponse, generateQuizQuestions, generateCreativeTask,
  generateThinkingChallenge, generateMythFact, generateDailyLifeQuestion,
  answerDoubt
} from "./openai";
import { insertChatMessageSchema, insertDoubtSchema, insertQuizSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all subjects
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getAllSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  // Get questions for quiz generation
  app.get("/api/questions/:subjectId/:grade", async (req, res) => {
    try {
      const { subjectId, grade } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const questions = await storage.getQuestionsBySubjectAndGrade(
        parseInt(subjectId), 
        parseInt(grade), 
        limit
      );
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  // Generate quiz using AI
  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const { subject, grade, chapter, count } = req.body;
      const questions = await generateQuizQuestions(subject, grade, chapter, count);
      
      // Store generated questions
      for (const q of questions) {
        const subjectRecord = (await storage.getAllSubjects()).find(s => s.name.toLowerCase() === subject.toLowerCase());
        if (subjectRecord) {
          await storage.createQuestion({
            subjectId: subjectRecord.id,
            grade: parseInt(grade),
            chapter,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            difficulty: "medium",
            type: "mcq"
          });
        }
      }
      
      res.json({ questions });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate quiz" });
    }
  });

  // Submit quiz
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const quizData = insertQuizSchema.parse(req.body);
      const quiz = await storage.createQuiz(quizData);
      
      // Update user stats
      const user = await storage.getUser(quizData.userId);
      if (user) {
        const userQuizzes = await storage.getQuizzesByUser(quizData.userId);
        const totalScore = userQuizzes.reduce((sum, q) => sum + q.score, 0);
        const averageScore = Math.round(totalScore / userQuizzes.length);
        
        await storage.updateUser(quizData.userId, {
          totalQuizzes: userQuizzes.length,
          averageScore
        });
      }
      
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit quiz" });
    }
  });

  // Chat with AI
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, userId, context } = req.body;
      const response = await generateChatResponse(message, context);
      
      // Store chat message
      const chatMessage = await storage.createChatMessage({
        userId: userId || 1, // Default user for demo
        message,
        response,
        context,
        createdAt: new Date()
      });
      
      res.json({ response });
    } catch (error) {
      res.status(500).json({ message: "Failed to get chat response" });
    }
  });

  // Submit doubt
  app.post("/api/doubts", async (req, res) => {
    try {
      const doubtData = insertDoubtSchema.parse(req.body);
      
      // Get AI answer
      const subject = await storage.getSubject(doubtData.subjectId);
      const answer = await answerDoubt(doubtData.question, subject?.name || "General", 8); // Default grade
      
      const doubt = await storage.createDoubt({
        ...doubtData,
        answer,
        status: "answered",
        createdAt: new Date()
      });
      
      res.json(doubt);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit doubt" });
    }
  });

  // Get user doubts
  app.get("/api/doubts/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const doubts = await storage.getDoubtsByUser(parseInt(userId));
      res.json(doubts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doubts" });
    }
  });

  // Get creative tasks
  app.get("/api/creative-tasks", async (req, res) => {
    try {
      const { category } = req.query;
      const tasks = category 
        ? await storage.getCreativeTasksByCategory(category as string)
        : await storage.getAllCreativeTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creative tasks" });
    }
  });

  // Generate creative task
  app.post("/api/generate-creative-task", async (req, res) => {
    try {
      const { category } = req.body;
      const taskData = await generateCreativeTask(category);
      
      const task = await storage.createCreativeTask({
        title: taskData.title,
        description: taskData.description,
        category,
        difficulty: taskData.difficulty,
        prompt: taskData.prompt
      });
      
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate creative task" });
    }
  });

  // Get thinking challenges
  app.get("/api/thinking-challenges", async (req, res) => {
    try {
      const { type } = req.query;
      const challenges = type 
        ? await storage.getThinkingChallengesByType(type as string)
        : await storage.getAllThinkingChallenges();
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch thinking challenges" });
    }
  });

  // Generate thinking challenge
  app.post("/api/generate-thinking-challenge", async (req, res) => {
    try {
      const { type } = req.body;
      const challengeData = await generateThinkingChallenge(type);
      
      const challenge = await storage.createThinkingChallenge({
        title: challengeData.title,
        description: challengeData.description,
        type,
        hint: challengeData.hint,
        solution: challengeData.solution
      });
      
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate thinking challenge" });
    }
  });

  // Get myth facts
  app.get("/api/myth-facts", async (req, res) => {
    try {
      const mythFacts = await storage.getAllMythFacts();
      res.json(mythFacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch myth facts" });
    }
  });

  // Generate myth fact
  app.post("/api/generate-myth-fact", async (req, res) => {
    try {
      const mythFactData = await generateMythFact();
      
      const mythFact = await storage.createMythFact({
        title: mythFactData.title,
        statement: mythFactData.statement,
        isMyth: mythFactData.isMyth,
        explanation: mythFactData.explanation,
        category: mythFactData.category
      });
      
      res.json(mythFact);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate myth fact" });
    }
  });

  // Get daily life questions
  app.get("/api/daily-life-questions", async (req, res) => {
    try {
      const { subjectId } = req.query;
      const questions = subjectId 
        ? await storage.getDailyLifeQuestionsBySubject(parseInt(subjectId as string))
        : await storage.getAllDailyLifeQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch daily life questions" });
    }
  });

  // Generate daily life question
  app.post("/api/generate-daily-life-question", async (req, res) => {
    try {
      const { subject, subjectId } = req.body;
      const questionData = await generateDailyLifeQuestion(subject);
      
      const question = await storage.createDailyLifeQuestion({
        question: questionData.question,
        answer: questionData.answer,
        subjectId: parseInt(subjectId),
        realWorldConnection: questionData.realWorldConnection
      });
      
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate daily life question" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
