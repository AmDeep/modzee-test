import { apiRequest } from "./queryClient";

// Response interface matches Laravel's typical response format
interface AiAssistantResponse {
  reply: string;
  timestamp: string;
  status?: string;
  meta?: {
    model: string;
    processing_time?: number;
  };
}

/**
 * Laravel-style API service for AI capabilities
 * In a real Laravel/Vue application, this would be an API service using Axios
 */
class AiService {
  /**
   * Send a prompt to the AI assistant
   * 
   * @param prompt The user's message to the AI
   * @returns Promise containing the AI's response
   */
  static async sendPrompt(prompt: string): Promise<AiAssistantResponse> {
    // In a real Laravel app, this would be something like:
    // return axios.post('/api/assistant', { prompt });
    const res = await apiRequest("POST", "/api/ai/assistant", { prompt });
    return res.json();
  }
  
  /**
   * Analyze employee data and generate a management report
   * This implements the bonus reporting enhancement feature
   * 
   * @param data Array of employee data
   * @returns Promise containing the analysis results
   */
  static async analyzeEmployeeData(data: Array<EmployeeData>): Promise<AiAssistantResponse> {
    // In a real Laravel app, this would be something like:
    // return axios.post('/api/reports/employee-analysis', { data });
    const res = await apiRequest("POST", "/api/ai/analyze", { data });
    return res.json();
  }
}

// Export the service methods directly for ease of use
export const sendPromptToAssistant = AiService.sendPrompt;
export const analyzeEmployeeData = AiService.analyzeEmployeeData;

export interface EmployeeData {
  employee_id: string;
  name: string;
  team: string;
  engagement_score: number;
  training_completion: number;
  attendance_rate: number;
}

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface Settings {
  aiModel: string;
  temperature: number;
  saveHistory: boolean;
  clearOnSubmit: boolean;
}

export const DEFAULT_EMPLOYEE_DATA: EmployeeData[] = [
  {
    "employee_id": "E001",
    "name": "Jane Doe",
    "team": "Sales",
    "engagement_score": 78,
    "training_completion": 100,
    "attendance_rate": 92
  },
  {
    "employee_id": "E002",
    "name": "John Smith",
    "team": "Sales",
    "engagement_score": 65,
    "training_completion": 80,
    "attendance_rate": 85
  },
  {
    "employee_id": "E003",
    "name": "Sara Khan",
    "team": "Sales",
    "engagement_score": 50,
    "training_completion": 60,
    "attendance_rate": 70
  }
];
