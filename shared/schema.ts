import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// AI Assistant Logs
export const aiLogs = pgTable("ai_logs", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  reply: text("reply").notNull(),
  model: text("model").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertAiLogSchema = createInsertSchema(aiLogs).pick({
  prompt: true,
  reply: true,
  model: true,
});

// Employee data for analysis
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  employee_id: text("employee_id").notNull().unique(),
  name: text("name").notNull(),
  team: text("team").notNull(),
  engagement_score: integer("engagement_score").notNull(),
  training_completion: integer("training_completion").notNull(),
  attendance_rate: integer("attendance_rate").notNull(),
});

export const insertEmployeeSchema = createInsertSchema(employees).pick({
  employee_id: true,
  name: true,
  team: true,
  engagement_score: true,
  training_completion: true,
  attendance_rate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAiLog = z.infer<typeof insertAiLogSchema>;
export type AiLog = typeof aiLogs.$inferSelect;

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;
