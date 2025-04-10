# modzee AI Assistant Module

A proof-of-concept AI Assistant module for modzee that integrates OpenAI's API into a Laravel/Vue-like architecture with reporting capabilities.

## Project Overview

This project implements an AI assistant that:

1. Accepts structured user input (e.g., "Summarize team performance for March")
2. Sends a request to the OpenAI API
3. Returns a contextual, helpful response
4. Displays the response in a Vue-like UI

Additionally, it includes a bonus reporting enhancement that analyzes employee performance data and generates management summaries.

## Features Implemented

- ✅ AI Assistant with OpenAI API integration (using latest GPT-4o model)
- ✅ Conversation history with formatted responses
- ✅ Settings panel for AI parameters (model, temperature, etc.)
- ✅ Employee data analysis with structured OpenAI prompts
- ✅ Input validation and error handling
- ✅ Performance logging with timestamps and processing time
- ✅ Secure API key handling via environment variables

## Technical Architecture

This implementation uses:

- **Backend**: Node.js/Express
- **Frontend**: React (structured in a Vue.js-like component organization)
- **API Integration**: OpenAI API (latest GPT-4o model)
- **Styling**: TailwindCSS with Laravel-inspired UI patterns

## Installation and Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Access the application at: http://localhost:5000

## Using the Application

### AI Assistant
- Type a question or prompt in the input field and press "Ask"
- View the AI-generated response in the conversation history
- Previous conversations are saved (toggle this in settings)

### Data Analysis
- Click "Generate Management Report" to analyze the sample employee data 
- The AI will produce a detailed analysis of performance trends, issues, and recommendations

### Settings
- Change the AI model (GPT-4o or GPT-3.5-turbo)
- Adjust response creativity via the temperature slider
- Toggle saving conversation history and clearing input after sending

## API Endpoints

- `POST /api/ai/assistant`: Processes user prompts
  - Payload: `{ "prompt": "Your question here" }`
  - Response: `{ "status": "success", "reply": "AI response", "timestamp": "ISO date" }`

- `POST /api/ai/analyze`: Analyzes employee data
  - Payload: `{ "data": [employee_records] }`
  - Response: `{ "status": "success", "reply": "Analysis results", "timestamp": "ISO date" }`

## Scalability and Security Considerations

- API keys are securely stored in environment variables
- Input validation on all endpoints
- Error handling for API failures and invalid inputs
- Timestamps and performance logging for monitoring

## Future Enhancements

- Persistent database storage for conversation history
- User authentication and per-user history
- Enhanced data visualization for employee performance metrics
- Support for additional OpenAI models
- File upload capabilities for document analysis
