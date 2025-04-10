interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export default function PromptInput({ prompt, setPrompt, onSubmit, isLoading }: PromptInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col space-y-2">
        <div className="relative rounded-md shadow-sm">
          <textarea 
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="block w-full rounded-md border-gray-300 border py-3 px-4 focus:border-blue-500 focus:ring-blue-500 text-sm"
            placeholder="Ask me about team performance, or request a specific report..."
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="material-icons text-sm">info</span>
            <span>For better results, be specific in your requests</span>
          </div>
          <button 
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Send</span>
            <span className="material-icons text-sm ml-1">send</span>
          </button>
        </div>
      </div>
    </form>
  );
}
