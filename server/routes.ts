import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAiRoutes } from "./api/assistant";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Assistant routes
  setupAiRoutes(app);

  const httpServer = createServer(app);

  return httpServer;
}
