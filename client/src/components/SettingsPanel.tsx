import { Settings } from "@/lib/openai";

interface SettingsPanelProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  onClearHistory: () => void;
}

/**
 * SettingsPanel Component
 * 
 * This component follows Vue component organization patterns
 * with computed properties and methods sections
 * 
 * @component
 */
export default function SettingsPanel({ settings, setSettings, onClearHistory }: SettingsPanelProps) {
  // Computed properties (similar to Vue's computed section)
  const temperaturePercentage = Math.round(settings.temperature * 100);
  const modelOptions = [
    { value: 'gpt-4o', label: 'GPT-4o (Latest)' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
  ];
  
  // Methods (mimicking Vue component methods organization)
  const methods = {
    updateModel: (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSettings({...settings, aiModel: e.target.value});
    },
    
    updateTemperature: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({...settings, temperature: parseFloat(e.target.value)});
    },
    
    toggleSaveHistory: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({...settings, saveHistory: e.target.checked});
    },
    
    toggleClearOnSubmit: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({...settings, clearOnSubmit: e.target.checked});
    },
    
    clearConversationHistory: () => {
      if (window.confirm('Are you sure you want to clear all conversation history? This cannot be undone.')) {
        onClearHistory();
      }
    }
  };

  // Template (mimicking Laravel/Vue.js UI patterns)
  return (
    <div id="settings-panel" className="laravel-settings-panel">
      <h3 className="text-md font-medium text-gray-900 mb-4">AI Assistant Settings</h3>
      
      <div className="space-y-5">
        {/* Model selection - Laravel card style */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="mb-2">
              <div className="text-sm font-medium">AI Model</div>
              <div className="text-xs text-gray-500">Select which OpenAI model to use</div>
            </div>
            <select 
              className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={settings.aiModel}
              onChange={methods.updateModel}
            >
              {modelOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          {/* Model description - like Laravel form field help text */}
          <div className="mt-2 p-2 bg-blue-50 text-blue-700 text-xs rounded-md">
            <p className="flex items-center">
              <span className="material-icons text-blue-500 text-xs mr-1">info</span>
              {settings.aiModel.includes('gpt-4') ? 
                'GPT-4 models provide more advanced reasoning and higher quality responses.' : 
                'GPT-3.5 provides faster responses but may be less accurate for complex tasks.'}
            </p>
          </div>
        </div>
        
        {/* Temperature control - Laravel style */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Response Creativity</div>
              <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                {temperaturePercentage}%
              </div>
            </div>
            <div className="text-xs text-gray-500">Controls response variability and creativity</div>
          </div>
          
          <div className="mt-3 flex items-center">
            <span className="text-xs text-gray-500 w-24">Precise</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={settings.temperature}
              onChange={methods.updateTemperature}
              className="flex-1 h-2 bg-gray-200 rounded-lg accent-blue-600" 
            />
            <span className="text-xs text-gray-500 w-24 text-right">Creative</span>
          </div>
        </div>
        
        {/* Toggle switches - grouped in Laravel card style */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
          <h4 className="text-sm font-medium mb-3">Behavior Settings</h4>
          
          <div className="space-y-4">
            {/* Save history toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Save Conversation History</div>
                <div className="text-xs text-gray-500">Store prompts and responses</div>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="toggle-history" 
                  className="sr-only"
                  checked={settings.saveHistory}
                  onChange={methods.toggleSaveHistory}
                />
                <label 
                  htmlFor="toggle-history" 
                  className={`block h-6 w-10 rounded-full ${settings.saveHistory ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer transition-colors duration-200`}
                ></label>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${settings.saveHistory ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>
            
            {/* Clear on submit toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Clear on Submit</div>
                <div className="text-xs text-gray-500">Clear input after sending prompt</div>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="toggle-clear" 
                  className="sr-only"
                  checked={settings.clearOnSubmit}
                  onChange={methods.toggleClearOnSubmit}
                />
                <label 
                  htmlFor="toggle-clear" 
                  className={`block h-6 w-10 rounded-full ${settings.clearOnSubmit ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer transition-colors duration-200`}
                ></label>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${settings.clearOnSubmit ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons - Laravel-style danger button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button 
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          onClick={methods.clearConversationHistory}
        >
          <span className="material-icons text-sm mr-2">delete</span>
          Clear Conversation History
        </button>
      </div>
    </div>
  );
}
