import { Message } from "@/lib/openai";
import { useEffect, useRef } from "react";

interface ConversationHistoryProps {
  history: Message[];
  isLoading: boolean;
}

/**
 * ConversationHistory Component
 * 
 * Displays the conversation history between the user and AI
 * Styled to resemble a Laravel/Vue.js chat interface
 * 
 * @component
 */
export default function ConversationHistory({ history, isLoading }: ConversationHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when history changes - similar to Vue's watch functionality
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  // Format time helper - similar to Vue filters
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // Format content to add styling to headings and bullet points
  const formatContent = (content: string) => {
    // Simple formatting for section titles and bullet points
    // In a real app, use a markdown parser here
    
    // Special handling for AI-generated content to make it more readable
    if (content.includes('# ') || content.includes('## ') || content.includes('- ')) {
      // Split by newlines and process each line
      const lines = content.split('\n');
      const formattedLines = lines.map(line => {
        // Format headers (# Title)
        if (line.startsWith('# ')) {
          return `<h3 class="text-lg font-bold mt-3 mb-2">${line.substring(2)}</h3>`;
        }
        // Format subheaders (## Title)
        else if (line.startsWith('## ')) {
          return `<h4 class="text-md font-semibold mt-2 mb-1">${line.substring(3)}</h4>`;
        }
        // Format bullet points
        else if (line.startsWith('- ')) {
          return `<li class="ml-4">${line.substring(2)}</li>`;
        }
        // Format numbered lists (1. Item)
        else if (/^\d+\.\s/.test(line)) {
          return `<li class="ml-4 list-decimal">${line.substring(line.indexOf('.') + 2)}</li>`;
        }
        // Keep other lines as is
        return line;
      });
      
      // Add proper list tags
      let inList = false;
      const wrappedLines = [];
      
      for (let i = 0; i < formattedLines.length; i++) {
        const line = formattedLines[i];
        
        // Start a new list when we encounter a list item
        if ((line.startsWith('<li') && !inList)) {
          wrappedLines.push('<ul class="list-disc my-2">');
          inList = true;
        }
        // End the list when we encounter a non-list item after a list
        else if (!line.startsWith('<li') && inList && line.trim() !== '') {
          wrappedLines.push('</ul>');
          inList = false;
        }
        
        wrappedLines.push(line);
      }
      
      // Close any open list at the end
      if (inList) {
        wrappedLines.push('</ul>');
      }
      
      return <div dangerouslySetInnerHTML={{ __html: wrappedLines.join('\n') }} />;
    }
    
    // Default rendering for simple content
    return content;
  };

  // Template - mimicking Laravel/Vue.js chat interface
  return (
    <div 
      ref={containerRef}
      className="space-y-4 mb-6 max-h-[500px] overflow-y-auto scroll-smooth" 
    >
      {/* Empty state when no messages */}
      {history.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <div className="material-icons text-gray-300 text-5xl mb-2">chat</div>
          <p className="text-gray-500">No conversation history yet.</p>
          <p className="text-gray-400 text-sm">Start by asking a question below!</p>
        </div>
      )}
      
      {/* Message history */}
      {history.map((message) => (
        <div 
          key={message.id}
          className={`${message.type === 'user' ? 'user-message bg-gray-50' : 'ai-message bg-blue-50'} p-4 rounded-md shadow-sm border ${message.type === 'user' ? 'border-gray-200' : 'border-blue-200'} fade-in`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className={`h-8 w-8 rounded-full ${message.type === 'user' ? 'bg-purple-100' : 'bg-blue-100'} flex items-center justify-center`}>
                <span className={`material-icons ${message.type === 'user' ? 'text-purple-500' : 'text-blue-500'} text-sm`}>
                  {message.type === 'user' ? 'person' : 'smart_toy'}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {message.type === 'user' ? 'You' : 'AI Assistant'}
                </p>
                <div className="text-xs text-gray-400">
                  {formatTime(message.timestamp)}
                </div>
              </div>
              <div className={`text-sm text-gray-700 mt-1 ${message.type === 'ai' ? 'prose prose-sm max-w-none' : ''}`}>
                {formatContent(message.content)}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Loading state */}
      {isLoading && (
        <div className="ai-message bg-blue-50 p-4 rounded-md shadow-sm border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="material-icons text-blue-500 text-sm">smart_toy</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">AI Assistant</p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-1 animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-1 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className="ml-2 text-sm text-gray-600">Processing your request...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
