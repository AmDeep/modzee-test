import AiAssistant from "@/components/AiAssistant";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'data' | 'settings'>('data');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">modzee AI Assistant</h1>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">BETA</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setActiveTab('data')}
            >
              <span className="material-icons">equalizer</span>
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setActiveTab('settings')}
            >
              <span className="material-icons">settings</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AiAssistant />
      </main>
    </div>
  );
}
