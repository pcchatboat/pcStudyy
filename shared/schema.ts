import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  grade: integer("grade").notNull().default(6),
  streak: integer("streak").notNull().default(0),
  totalQuizzes: integer("total_quizzes").notNull().default(0),
  averageScore: integer("average_score").notNull().default(0),
});

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  totalChapters: integer("total_chapters").notNull(),
  description: text("description").notNull(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull(),
  grade: integer("grade").notNull(),
  chapter: text("chapter").notNull(),
  question: text("question").notNull(),
  options: jsonb("options").$type<string[]>(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation"),
  difficulty: text("difficulty").notNull().default("medium"),
  type: text("type").notNull().default("mcq"), // mcq, fill, essay
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subjectId: integer("subject_id").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  timeSpent: integer("time_spent").notNull(), // in seconds
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const doubts = pgTable("doubts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subjectId: integer("subject_id").notNull(),
  question: text("question").notNull(),
  answer: text("answer"),
  status: text("status").notNull().default("pending"), // pending, answered
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const creativeTasks = pgTable("creative_tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // writing, art, project
  difficulty: text("difficulty").notNull(),
  prompt: text("prompt").notNull(),
});

export const thinkingChallenges = pgTable("thinking_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // brain_teaser, lateral_thinking, innovation
  hint: text("hint"),
  solution: text("solution"),
});

export const mythFacts = pgTable("myth_facts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  statement: text("statement").notNull(),
  isMyth: boolean("is_myth").notNull(),
  explanation: text("explanation").notNull(),
  category: text("category").notNull(),
});

export const dailyLifeQuestions = pgTable("daily_life_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  subjectId: integer("subject_id").notNull(),
  realWorldConnection: text("real_world_connection").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  context: text("context"), // subject, grade, etc.
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertSubjectSchema = createInsertSchema(subjects).omit({ id: true });
export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true });
export const insertQuizSchema = createInsertSchema(quizzes).omit({ id: true });
export const insertDoubtSchema = createInsertSchema(doubts).omit({ id: true });
export const insertCreativeTaskSchema = createInsertSchema(creativeTasks).omit({ id: true });
export const insertThinkingChallengeSchema = createInsertSchema(thinkingChallenges).omit({ id: true });
export const insertMythFactSchema = createInsertSchema(mythFacts).omit({ id: true });
export const insertDailyLifeQuestionSchema = createInsertSchema(dailyLifeQuestions).omit({ id: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Doubt = typeof doubts.$inferSelect;
export type InsertDoubt = z.infer<typeof insertDoubtSchema>;
export type CreativeTask = typeof creativeTasks.$inferSelect;
export type InsertCreativeTask = z.infer<typeof insertCreativeTaskSchema>;
export type ThinkingChallenge = typeof thinkingChallenges.$inferSelect;
export type InsertThinkingChallenge = z.infer<typeof insertThinkingChallengeSchema>;
export type MythFact = typeof mythFacts.$inferSelect;
export type InsertMythFact = z.infer<typeof insertMythFactSchema>;
export type DailyLifeQuestion = typeof dailyLifeQuestions.$inferSelect;
export type InsertDailyLifeQuestion = z.infer<typeof insertDailyLifeQuestionSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
