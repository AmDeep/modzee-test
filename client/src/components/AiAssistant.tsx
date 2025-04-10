import { useState } from "react";
import ConversationHistory from "./ConversationHistory";
import PromptInput from "./PromptInput";
import DataPanel from "./DataPanel";
import SettingsPanel from "./SettingsPanel";
import { Settings, Message, EmployeeData, DEFAULT_EMPLOYEE_DATA } from "@/lib/openai";
import { sendPromptToAssistant, analyzeEmployeeData } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";

/**
 * AiAssistant Component
 * 
 * This is the main component that simulates a Laravel/Vue.js architecture
 * by organizing state and methods in a Vue-like structure
 * 
 * @component
 */
export default function AiAssistant() {
  // Toast notifications - similar to Vue's notification libraries
  const { toast } = useToast();
  
  // Component data (similar to Vue's data() function)
  const [activePanel, setActivePanel] = useState<'data' | 'settings'>('data');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [employeeData] = useState<EmployeeData[]>(DEFAULT_EMPLOYEE_DATA);
  const [settings, setSettings] = useState<Settings>({
    aiModel: 'gpt-4o', // updated to latest model
    temperature: 0.7,
    saveHistory: true,
    clearOnSubmit: true
  });

  // Methods (similar to Vue's methods object)
  // We're organizing these in a methods section for clarity and to mimic Vue's structure
  const methods = {
    // Submit a user prompt to the assistant
    handleSubmit: async (submittedPrompt: string) => {
      if (!submittedPrompt.trim() || isLoading) return;
      
      const userMessage: Message = {
        id: nanoid(),
        type: 'user',
        content: submittedPrompt,
        timestamp: new Date()
      };
      
      setConversationHistory(prev => [...prev, userMessage]);
      setIsLoading(true);
      
      try {
        // This would be an Axios call in a Vue app
        const response = await sendPromptToAssistant(submittedPrompt);
        
        const aiMessage: Message = {
          id: nanoid(),
          type: 'ai',
          content: response.reply,
          timestamp: new Date(response.timestamp)
        };
        
        if (settings.saveHistory) {
          setConversationHistory(prev => [...prev, aiMessage]);
        }
        
        if (settings.clearOnSubmit) {
          setPrompt("");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get a response from the AI assistant. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    },

    // Analyze employee data - this is the bonus task implementation
    handleAnalyzeData: async () => {
      setIsLoading(true);
      
      // Create a more Laravel-like structured query message
      const userMessage: Message = {
        id: nanoid(),
        type: 'user',
        content: "Generate a management report: Summarize the sales team performance data, highlight concerning trends, and provide recommendations for improvement.",
        timestamp: new Date()
      };
      
      setConversationHistory(prev => [...prev, userMessage]);
      
      try {
        // This would be an Axios call in a Vue app to a Laravel backend
        const response = await analyzeEmployeeData(employeeData);
        
        const aiMessage: Message = {
          id: nanoid(),
          type: 'ai',
          content: response.reply,
          timestamp: new Date(response.timestamp)
        };
        
        if (settings.saveHistory) {
          setConversationHistory(prev => [...prev, aiMessage]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to analyze employee data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    },

    // Clear conversation history
    handleClearHistory: () => {
      if (window.confirm('Are you sure you want to clear all conversation history?')) {
        setConversationHistory([]);
      }
    },

    // Switch between panels
    togglePanel: (panel: 'data' | 'settings') => {
      setActivePanel(panel);
    }
  };

  // Template - similar to Vue's template section
  // We're styling this to look more like a Laravel/Vue.js application
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header - styled with Laravel's typical UI patterns */}
      <div className="p-5 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium text-gray-900">AI Assistant</h2>
            <p className="text-sm text-gray-500">Ask questions about your team's performance or request specific reports</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => methods.togglePanel('data')}
              className={`px-3 py-1 rounded text-sm ${activePanel === 'data' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Data
            </button>
            <button 
              onClick={() => methods.togglePanel('settings')}
              className={`px-3 py-1 rounded text-sm ${activePanel === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col md:flex-row">
        {/* Chat and input area */}
        <div className="w-full md:w-2/3 p-5">
          <ConversationHistory 
            history={conversationHistory} 
            isLoading={isLoading} 
          />
          <PromptInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={methods.handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {/* Sidebar panels */}
        <div className="w-full md:w-1/3 bg-gray-50 p-5 border-t md:border-t-0 md:border-l border-gray-200">
          {activePanel === 'data' ? (
            <DataPanel 
              employeeData={employeeData} 
              onAnalyzeData={methods.handleAnalyzeData} 
            />
          ) : (
            <SettingsPanel 
              settings={settings}
              setSettings={setSettings}
              onClearHistory={methods.handleClearHistory}
            />
          )}
        </div>
      </div>
    </div>
  );
}
