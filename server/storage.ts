import {
  users, subjects, questions, quizzes, doubts, creativeTasks, 
  thinkingChallenges, mythFacts, dailyLifeQuestions, chatMessages,
  type User, type InsertUser, type Subject, type InsertSubject,
  type Question, type InsertQuestion, type Quiz, type InsertQuiz,
  type Doubt, type InsertDoubt, type CreativeTask, type InsertCreativeTask,
  type ThinkingChallenge, type InsertThinkingChallenge, type MythFact, type InsertMythFact,
  type DailyLifeQuestion, type InsertDailyLifeQuestion, type ChatMessage, type InsertChatMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Subjects
  getAllSubjects(): Promise<Subject[]>;
  getSubject(id: number): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;

  // Questions
  getQuestionsBySubjectAndGrade(subjectId: number, grade: number, limit?: number): Promise<Question[]>;
  getQuestionsByChapter(subjectId: number, grade: number, chapter: string): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;

  // Quizzes
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuizzesByUser(userId: number): Promise<Quiz[]>;
  updateQuiz(id: number, updates: Partial<Quiz>): Promise<Quiz | undefined>;

  // Doubts
  createDoubt(doubt: InsertDoubt): Promise<Doubt>;
  getDoubtsByUser(userId: number): Promise<Doubt[]>;
  updateDoubt(id: number, updates: Partial<Doubt>): Promise<Doubt | undefined>;

  // Creative Tasks
  getAllCreativeTasks(): Promise<CreativeTask[]>;
  getCreativeTasksByCategory(category: string): Promise<CreativeTask[]>;
  createCreativeTask(task: InsertCreativeTask): Promise<CreativeTask>;

  // Thinking Challenges
  getAllThinkingChallenges(): Promise<ThinkingChallenge[]>;
  getThinkingChallengesByType(type: string): Promise<ThinkingChallenge[]>;
  createThinkingChallenge(challenge: InsertThinkingChallenge): Promise<ThinkingChallenge>;

  // Myth Facts
  getAllMythFacts(): Promise<MythFact[]>;
  createMythFact(mythFact: InsertMythFact): Promise<MythFact>;

  // Daily Life Questions
  getAllDailyLifeQuestions(): Promise<DailyLifeQuestion[]>;
  getDailyLifeQuestionsBySubject(subjectId: number): Promise<DailyLifeQuestion[]>;
  createDailyLifeQuestion(question: InsertDailyLifeQuestion): Promise<DailyLifeQuestion>;

  // Chat Messages
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesByUser(userId: number, limit?: number): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private subjects = new Map<number, Subject>();
  private questions = new Map<number, Question>();
  private quizzes = new Map<number, Quiz>();
  private doubts = new Map<number, Doubt>();
  private creativeTasks = new Map<number, CreativeTask>();
  private thinkingChallenges = new Map<number, ThinkingChallenge>();
  private mythFacts = new Map<number, MythFact>();
  private dailyLifeQuestions = new Map<number, DailyLifeQuestion>();
  private chatMessages = new Map<number, ChatMessage>();
  
  private currentId = 1;

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize default subjects
    const defaultSubjects: InsertSubject[] = [
      { name: "Mathematics", icon: "calculator", color: "blue", totalChapters: 12, description: "Algebra, Geometry, Statistics & more" },
      { name: "Science", icon: "flask", color: "green", totalChapters: 15, description: "Physics, Chemistry, Biology" },
      { name: "Social Science", icon: "globe-americas", color: "yellow", totalChapters: 18, description: "History, Geography, Civics" },
      { name: "English", icon: "book", color: "purple", totalChapters: 10, description: "Literature, Grammar, Writing" },
      { name: "Hindi", icon: "language", color: "orange", totalChapters: 14, description: "Literature, Grammar, Composition" },
      { name: "Sanskrit", icon: "om", color: "red", totalChapters: 8, description: "Shlokas, Grammar, Literature" },
      { name: "Reasoning and IQ", icon: "brain", color: "indigo", totalChapters: 15, description: "Logic, critical thinking, and problem-solving skills" },
    ];

    defaultSubjects.forEach(subject => {
      const id = this.currentId++;
      this.subjects.set(id, { ...subject, id });
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      grade: insertUser.grade ?? 6,
      streak: insertUser.streak ?? 0,
      totalQuizzes: insertUser.totalQuizzes ?? 0,
      averageScore: insertUser.averageScore ?? 0
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Subjects
  async getAllSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async getSubject(id: number): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }

  async createSubject(insertSubject: InsertSubject): Promise<Subject> {
    const id = this.currentId++;
    const subject: Subject = { ...insertSubject, id };
    this.subjects.set(id, subject);
    return subject;
  }

  // Questions
  async getQuestionsBySubjectAndGrade(subjectId: number, grade: number, limit = 10): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.subjectId === subjectId && q.grade === grade)
      .slice(0, limit);
  }

  async getQuestionsByChapter(subjectId: number, grade: number, chapter: string): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.subjectId === subjectId && q.grade === grade && q.chapter === chapter);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentId++;
    const question: Question = { 
      id,
      subjectId: insertQuestion.subjectId,
      grade: insertQuestion.grade,
      chapter: insertQuestion.chapter,
      question: insertQuestion.question,
      options: insertQuestion.options ? (Array.isArray(insertQuestion.options) ? insertQuestion.options : Array.from(insertQuestion.options)) : null,
      correctAnswer: insertQuestion.correctAnswer,
      explanation: insertQuestion.explanation ?? null,
      difficulty: insertQuestion.difficulty ?? "medium",
      type: insertQuestion.type ?? "mcq"
    };
    this.questions.set(id, question);
    return question;
  }

  // Quizzes
  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.currentId++;
    const quiz: Quiz = { 
      id,
      userId: insertQuiz.userId,
      subjectId: insertQuiz.subjectId,
      score: insertQuiz.score,
      totalQuestions: insertQuiz.totalQuestions,
      timeSpent: insertQuiz.timeSpent,
      completed: insertQuiz.completed ?? false,
      createdAt: insertQuiz.createdAt ?? new Date()
    };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async getQuizzesByUser(userId: number): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).filter(q => q.userId === userId);
  }

  async updateQuiz(id: number, updates: Partial<Quiz>): Promise<Quiz | undefined> {
    const quiz = this.quizzes.get(id);
    if (!quiz) return undefined;
    const updatedQuiz = { ...quiz, ...updates };
    this.quizzes.set(id, updatedQuiz);
    return updatedQuiz;
  }

  // Doubts
  async createDoubt(insertDoubt: InsertDoubt): Promise<Doubt> {
    const id = this.currentId++;
    const doubt: Doubt = { 
      id,
      userId: insertDoubt.userId,
      subjectId: insertDoubt.subjectId,
      question: insertDoubt.question,
      answer: insertDoubt.answer ?? null,
      status: insertDoubt.status ?? "pending",
      createdAt: insertDoubt.createdAt ?? new Date()
    };
    this.doubts.set(id, doubt);
    return doubt;
  }

  async getDoubtsByUser(userId: number): Promise<Doubt[]> {
    return Array.from(this.doubts.values()).filter(d => d.userId === userId);
  }

  async updateDoubt(id: number, updates: Partial<Doubt>): Promise<Doubt | undefined> {
    const doubt = this.doubts.get(id);
    if (!doubt) return undefined;
    const updatedDoubt = { ...doubt, ...updates };
    this.doubts.set(id, updatedDoubt);
    return updatedDoubt;
  }

  // Creative Tasks
  async getAllCreativeTasks(): Promise<CreativeTask[]> {
    return Array.from(this.creativeTasks.values());
  }

  async getCreativeTasksByCategory(category: string): Promise<CreativeTask[]> {
    return Array.from(this.creativeTasks.values()).filter(t => t.category === category);
  }

  async createCreativeTask(insertTask: InsertCreativeTask): Promise<CreativeTask> {
    const id = this.currentId++;
    const task: CreativeTask = { ...insertTask, id };
    this.creativeTasks.set(id, task);
    return task;
  }

  // Thinking Challenges
  async getAllThinkingChallenges(): Promise<ThinkingChallenge[]> {
    return Array.from(this.thinkingChallenges.values());
  }

  async getThinkingChallengesByType(type: string): Promise<ThinkingChallenge[]> {
    return Array.from(this.thinkingChallenges.values()).filter(c => c.type === type);
  }

  async createThinkingChallenge(insertChallenge: InsertThinkingChallenge): Promise<ThinkingChallenge> {
    const id = this.currentId++;
    const challenge: ThinkingChallenge = { 
      id,
      title: insertChallenge.title,
      description: insertChallenge.description,
      type: insertChallenge.type,
      hint: insertChallenge.hint ?? null,
      solution: insertChallenge.solution ?? null
    };
    this.thinkingChallenges.set(id, challenge);
    return challenge;
  }

  // Myth Facts
  async getAllMythFacts(): Promise<MythFact[]> {
    return Array.from(this.mythFacts.values());
  }

  async createMythFact(insertMythFact: InsertMythFact): Promise<MythFact> {
    const id = this.currentId++;
    const mythFact: MythFact = { ...insertMythFact, id };
    this.mythFacts.set(id, mythFact);
    return mythFact;
  }

  // Daily Life Questions
  async getAllDailyLifeQuestions(): Promise<DailyLifeQuestion[]> {
    return Array.from(this.dailyLifeQuestions.values());
  }

  async getDailyLifeQuestionsBySubject(subjectId: number): Promise<DailyLifeQuestion[]> {
    return Array.from(this.dailyLifeQuestions.values()).filter(q => q.subjectId === subjectId);
  }

  async createDailyLifeQuestion(insertQuestion: InsertDailyLifeQuestion): Promise<DailyLifeQuestion> {
    const id = this.currentId++;
    const question: DailyLifeQuestion = { ...insertQuestion, id };
    this.dailyLifeQuestions.set(id, question);
    return question;
  }

  // Chat Messages
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentId++;
    const message: ChatMessage = { 
      id,
      userId: insertMessage.userId,
      message: insertMessage.message,
      response: insertMessage.response,
      context: insertMessage.context ?? null,
      createdAt: insertMessage.createdAt ?? new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessagesByUser(userId: number, limit = 50): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(m => m.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllSubjects(): Promise<Subject[]> {
    return await db.select().from(subjects);
  }

  async getSubject(id: number): Promise<Subject | undefined> {
    const [subject] = await db.select().from(subjects).where(eq(subjects.id, id));
    return subject || undefined;
  }

  async createSubject(subject: InsertSubject): Promise<Subject> {
    const [newSubject] = await db
      .insert(subjects)
      .values(subject)
      .returning();
    return newSubject;
  }

  async getQuestionsBySubjectAndGrade(subjectId: number, grade: number, limit = 10): Promise<Question[]> {
    return await db
      .select()
      .from(questions)
      .where(and(eq(questions.subjectId, subjectId), eq(questions.grade, grade)))
      .limit(limit);
  }

  async getQuestionsByChapter(subjectId: number, grade: number, chapter: string): Promise<Question[]> {
    return await db
      .select()
      .from(questions)
      .where(and(
        eq(questions.subjectId, subjectId), 
        eq(questions.grade, grade), 
        eq(questions.chapter, chapter)
      ));
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await db
      .insert(questions)
      .values(question)
      .returning();
    return newQuestion;
  }

  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const [newQuiz] = await db
      .insert(quizzes)
      .values(quiz)
      .returning();
    return newQuiz;
  }

  async getQuizzesByUser(userId: number): Promise<Quiz[]> {
    return await db
      .select()
      .from(quizzes)
      .where(eq(quizzes.userId, userId));
  }

  async updateQuiz(id: number, updates: Partial<Quiz>): Promise<Quiz | undefined> {
    const [quiz] = await db
      .update(quizzes)
      .set(updates)
      .where(eq(quizzes.id, id))
      .returning();
    return quiz || undefined;
  }

  async createDoubt(doubt: InsertDoubt): Promise<Doubt> {
    const [newDoubt] = await db
      .insert(doubts)
      .values(doubt)
      .returning();
    return newDoubt;
  }

  async getDoubtsByUser(userId: number): Promise<Doubt[]> {
    return await db
      .select()
      .from(doubts)
      .where(eq(doubts.userId, userId));
  }

  async updateDoubt(id: number, updates: Partial<Doubt>): Promise<Doubt | undefined> {
    const [doubt] = await db
      .update(doubts)
      .set(updates)
      .where(eq(doubts.id, id))
      .returning();
    return doubt || undefined;
  }

  async getAllCreativeTasks(): Promise<CreativeTask[]> {
    return await db.select().from(creativeTasks);
  }

  async getCreativeTasksByCategory(category: string): Promise<CreativeTask[]> {
    return await db
      .select()
      .from(creativeTasks)
      .where(eq(creativeTasks.category, category));
  }

  async createCreativeTask(task: InsertCreativeTask): Promise<CreativeTask> {
    const [newTask] = await db
      .insert(creativeTasks)
      .values(task)
      .returning();
    return newTask;
  }

  async getAllThinkingChallenges(): Promise<ThinkingChallenge[]> {
    return await db.select().from(thinkingChallenges);
  }

  async getThinkingChallengesByType(type: string): Promise<ThinkingChallenge[]> {
    return await db
      .select()
      .from(thinkingChallenges)
      .where(eq(thinkingChallenges.type, type));
  }

  async createThinkingChallenge(challenge: InsertThinkingChallenge): Promise<ThinkingChallenge> {
    const [newChallenge] = await db
      .insert(thinkingChallenges)
      .values(challenge)
      .returning();
    return newChallenge;
  }

  async getAllMythFacts(): Promise<MythFact[]> {
    return await db.select().from(mythFacts);
  }

  async createMythFact(mythFact: InsertMythFact): Promise<MythFact> {
    const [newMythFact] = await db
      .insert(mythFacts)
      .values(mythFact)
      .returning();
    return newMythFact;
  }

  async getAllDailyLifeQuestions(): Promise<DailyLifeQuestion[]> {
    return await db.select().from(dailyLifeQuestions);
  }

  async getDailyLifeQuestionsBySubject(subjectId: number): Promise<DailyLifeQuestion[]> {
    return await db
      .select()
      .from(dailyLifeQuestions)
      .where(eq(dailyLifeQuestions.subjectId, subjectId));
  }

  async createDailyLifeQuestion(question: InsertDailyLifeQuestion): Promise<DailyLifeQuestion> {
    const [newQuestion] = await db
      .insert(dailyLifeQuestions)
      .values(question)
      .returning();
    return newQuestion;
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db
      .insert(chatMessages)
      .values(message)
      .returning();
    return newMessage;
  }

  async getChatMessagesByUser(userId: number, limit = 50): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .limit(limit);
  }
}

// For development, use MemStorage to avoid database issues
export const storage = new MemStorage();
