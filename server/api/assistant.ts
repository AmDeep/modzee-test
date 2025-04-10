import type { Express, Request, Response } from "express";
import OpenAI from "openai";
import { z } from "zod";

// Initialize OpenAI SDK with API key from environment variables
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "YOUR_OPENAI_API_KEY" 
});

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o";

// In-memory storage for conversation logs
// In a real app this would be stored in a database
const aiLogs: {
  prompt: string;
  reply: string;
  timestamp: string;
}[] = [];

// Schema for prompt validation
const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty").max(1000, "Prompt too long"),
});

// Schema for employee data analysis
const employeeDataSchema = z.object({
  data: z.array(
    z.object({
      employee_id: z.string(),
      name: z.string(),
      team: z.string(),
      engagement_score: z.number(),
      training_completion: z.number(),
      attendance_rate: z.number(),
    })
  ),
});

/**
 * Setup API routes for AI functionality
 * 
 * This follows a Laravel-style routing structure where controllers
 * handle request processing and service classes handle business logic
 */
export function setupAiRoutes(app: Express) {
  /**
   * AiController - Mimicking Laravel's controller structure
   */
  const AiController = {
    /**
     * Handle prompt requests to the AI assistant
     * Similar to Laravel's controller method
     */
    assistantAction: async (req: Request, res: Response) => {
      try {
        // Validate the request body (like Laravel form requests)
        const validatedData = promptSchema.parse(req.body);
        const { prompt } = validatedData;
        
        // Start processing time measurement
        const startTime = Date.now();
        
        // Generate AI response (service layer in Laravel)
        const aiResponse = await generateAiResponse(prompt);
        
        // Calculate processing time
        const processingTime = Date.now() - startTime;
        
        // Log the interaction (in memory, would use Eloquent in Laravel)
        aiLogs.push({
          prompt,
          reply: aiResponse,
          timestamp: new Date().toISOString()
        });
        
        // Return the response (Laravel-style response format)
        return res.json({
          status: 'success',
          reply: aiResponse,
          timestamp: new Date().toISOString(),
          meta: {
            model: MODEL,
            processing_time: processingTime
          }
        });
      } catch (error) {
        // Laravel-style error handling
        if (error instanceof z.ZodError) {
          return res.status(422).json({ 
            status: 'error',
            message: "Validation error", 
            errors: error.errors 
          });
        }
        
        console.error("Error in AI assistant endpoint:", error);
        return res.status(500).json({ 
          status: 'error',
          message: "Failed to generate AI response"
        });
      }
    },

    /**
     * Handle employee data analysis requests
     * Implements the bonus task for reporting enhancement
     */
    analyzeAction: async (req: Request, res: Response) => {
      try {
        // Validate the request body
        const validatedData = employeeDataSchema.parse(req.body);
        const { data } = validatedData;
        
        // Start processing time measurement
        const startTime = Date.now();
        
        // Generate AI analysis response (service layer in Laravel)
        const aiResponse = await analyzeEmployeeData(data);
        
        // Calculate processing time
        const processingTime = Date.now() - startTime;
        
        // Return the response (Laravel-style response format)
        return res.json({
          status: 'success',
          reply: aiResponse,
          timestamp: new Date().toISOString(),
          meta: {
            model: MODEL,
            processing_time: processingTime
          }
        });
      } catch (error) {
        // Laravel-style error handling
        if (error instanceof z.ZodError) {
          return res.status(422).json({ 
            status: 'error',
            message: "Validation error", 
            errors: error.errors 
          });
        }
        
        console.error("Error in data analysis endpoint:", error);
        return res.status(500).json({ 
          status: 'error',
          message: "Failed to analyze employee data"
        });
      }
    }
  };

  // Route definitions (similar to Laravel's routes/api.php)
  app.post("/api/ai/assistant", AiController.assistantAction);
  app.post("/api/ai/analyze", AiController.analyzeAction);
}

async function generateAiResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for a company called modzee. You help analyze team performance data and provide insights about employee engagement, training completion, and attendance rates. Your responses should be helpful, concise, and professional."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response from OpenAI");
  }
}

async function analyzeEmployeeData(data: any[]): Promise<string> {
  try {
    const jsonString = JSON.stringify(data);

    // More structured formatting similar to Laravel's approach
    const formattedPrompt = `
Given this JSON data:
${jsonString}

Please analyze this employee data and provide the following:
1. A summary of concerning trends that management should be aware of
2. Specific issues with engagement, training, or attendance 
3. Recommendations for improvement
4. Visualization-ready insights (e.g., "Employee E003 has consistently lower scores across all metrics")

Format your response in a way that would be clear and actionable for management.
`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for a company called modzee. Your task is to analyze employee performance data and provide insights about engagement, training completion, and attendance rates. Focus on identifying concerning trends that management should be aware of. Format your response with clear sections and bullet points when appropriate."
        },
        {
          role: "user",
          content: formattedPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    return completion.choices[0].message.content || "I'm sorry, I couldn't analyze the data.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to analyze data with OpenAI");
  }
}
