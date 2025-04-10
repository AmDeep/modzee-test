import { EmployeeData } from "@/lib/openai";

interface DataPanelProps {
  employeeData: EmployeeData[];
  onAnalyzeData: () => void;
}

/**
 * DataPanel Component - Similar to a Vue.js component
 * 
 * This component displays employee data and provides a button to analyze it
 * Styled to resemble Laravel's typical UI patterns and Vue.js components
 * 
 * @component
 */
export default function DataPanel({ employeeData, onAnalyzeData }: DataPanelProps) {
  // Methods - similar to Vue component methods
  const methods = {
    handleRefreshData: () => {
      // This would refresh data from a Laravel API in a real application
      alert('Data refreshed from server!');
    },
    
    downloadCSV: () => {
      // Generate CSV content
      const headers = ['Employee ID', 'Name', 'Team', 'Engagement Score', 'Training Completion', 'Attendance Rate'];
      const csvRows = [headers];
      
      for (const employee of employeeData) {
        csvRows.push([
          employee.employee_id,
          employee.name,
          employee.team,
          employee.engagement_score.toString(),
          employee.training_completion.toString(),
          employee.attendance_rate.toString()
        ]);
      }
      
      const csvContent = csvRows.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employee_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Calculate average scores - similar to Vue's computed properties
  const avgEngagement = employeeData.reduce((sum, emp) => sum + emp.engagement_score, 0) / employeeData.length;
  const avgTraining = employeeData.reduce((sum, emp) => sum + emp.training_completion, 0) / employeeData.length;
  const avgAttendance = employeeData.reduce((sum, emp) => sum + emp.attendance_rate, 0) / employeeData.length;

  // Template - mimicking Laravel/Vue.js UI patterns
  return (
    <div id="data-panel" className="laravel-panel">
      <h3 className="text-md font-medium text-gray-900 mb-3">Team Data</h3>
      
      {/* Quick summary - similar to Laravel Dashboard cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Avg. Engagement</div>
          <div className={`text-lg font-medium ${avgEngagement < 60 ? 'text-red-600' : 'text-blue-600'}`}>
            {avgEngagement.toFixed(1)}%
          </div>
        </div>
        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Avg. Training</div>
          <div className={`text-lg font-medium ${avgTraining < 60 ? 'text-red-600' : 'text-blue-600'}`}>
            {avgTraining.toFixed(1)}%
          </div>
        </div>
        <div className="bg-white rounded-md p-3 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Avg. Attendance</div>
          <div className={`text-lg font-medium ${avgAttendance < 60 ? 'text-red-600' : 'text-blue-600'}`}>
            {avgAttendance.toFixed(1)}%
          </div>
        </div>
      </div>
      
      {/* Employee table */}
      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Sales Team Performance</h4>
            <div className="flex space-x-2">
              <button 
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                onClick={methods.downloadCSV}
              >
                <span className="material-icons text-xs mr-1">download</span>
                CSV
              </button>
              <button 
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                onClick={methods.handleRefreshData}
              >
                <span className="material-icons text-xs mr-1">refresh</span>
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        {/* Table header - like a Laravel table component */}
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Training</th>
                <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeData.map((employee) => (
                <tr key={employee.employee_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-xs text-gray-500">{employee.employee_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className={`inline-flex text-xs px-2 py-1 rounded-full ${
                      employee.engagement_score < 60 ? 'bg-red-100 text-red-700' : 
                      employee.engagement_score > 75 ? 'bg-green-100 text-green-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {employee.engagement_score}%
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className={`inline-flex text-xs px-2 py-1 rounded-full ${
                      employee.training_completion < 70 ? 'bg-red-100 text-red-700' : 
                      employee.training_completion > 90 ? 'bg-green-100 text-green-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {employee.training_completion}%
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className={`inline-flex text-xs px-2 py-1 rounded-full ${
                      employee.attendance_rate < 75 ? 'bg-red-100 text-red-700' : 
                      employee.attendance_rate > 90 ? 'bg-green-100 text-green-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {employee.attendance_rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 rounded-b-md">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
      
      {/* Analysis Button - styled like Laravel's primary action buttons */}
      <div className="mt-4">
        <button 
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onAnalyzeData}
        >
          <span className="material-icons text-white mr-2 text-sm">analytics</span>
          Generate Management Report
        </button>
      </div>
    </div>
  );
}
