# Mini Code Copilot

A modern, AI-powered code generation assistant built with React. Generate code snippets in multiple programming languages with a beautiful, feature-rich interface.

![Mini Code Copilot](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan) ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running
1. **Navigate to the project directory:**
   ```bash
   cd frontend/mycopilot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   > **Note**: This is a **Static Demo** version. It uses high-quality, pre-written code snippets for each language to demonstrate the UI and functionality without needing an API key.

4. **Open your browser:**
   The app will be running at `http://localhost:5173`

### Deployment (Vercel)
This project is configured for easy deployment on Vercel.
1. Push the code to a GitHub repository.
2. Import the project into Vercel.
3. Vercel will automatically detect the `vercel.json` and deploy.

---

## 🏗️ Brief Design/Architecture Decisions

### 1. Frontend-First Architecture (SPA)
- **Decision**: Removed the custom Express backend in favor of a client-side architecture.
- **Reasoning**: Simplifies deployment (can be hosted on Vercel/Netlify as a static site), reduces latency for mock data, and directly integrates with external APIs (OpenRouter) from the client.

### 2. Tech Stack: Vite + React + Tailwind
- **Vite**: Chosen for instant server start and HMR (Hot Module Replacement), providing a superior developer experience over Create React App.
- **Tailwind CSS**: Enables rapid UI development with utility classes, making it easy to implement complex designs like glassmorphism and dark mode without writing custom CSS files.
- **React Syntax Highlighter**: Uses Prism.js under the hood to provide accurate, theme-able syntax highlighting for generated code.

### 3. Smart Mock Data Strategy
- **Decision**: Implemented a robust fallback system.
- **Reasoning**: Ensures the application is always usable, even without API credits or internet connection. The system detects the selected language and returns a relevant, pre-written snippet (e.g., selecting "Python" returns Python code) instead of generic lorem ipsum.

### 4. State Management
- **React Hooks**: `useState` for local UI state and `useEffect` for side effects (persistence).
- **LocalStorage**: Used to persist user preferences (Dark Mode) and History, ensuring a seamless experience across sessions without needing a database.

---

## ✨ List of Implemented Features

### Core Functionality
- **Multi-Language Support**: Generate code in 10 languages (JS, Python, Java, C++, C#, Go, Rust, TypeScript, PHP, Ruby).
- **Smart AI Integration**: Connects to OpenRouter (GPT-4o) for high-quality generation.
- **Robust Fallback**: Automatically switches to language-specific mock data if the API fails.

### UI/UX Polish
- **Dynamic Theming**: Beautiful Light and Dark modes that instantly switch the UI and code editor themes (VS Light vs. VS Code Dark+).
- **Glassmorphism**: Modern, translucent UI elements with backdrop blur.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

### Developer Experience Tools
- **History System**: Automatically saves prompts; includes search and language filtering.
- **Code Editor Controls**:
  - **Copy to Clipboard**: One-click copy with visual feedback.
  - **Font Size**: Adjustable text size for better readability.
  - **Syntax Highlighting**: Professional-grade coloring for all supported languages.

---

## 🔮 If I had more time, what would you improve or add?

1.  **Streaming Responses**: Implement streaming for the OpenRouter API so code appears character-by-character, giving a more "real-time" AI feel.
2.  **Code Explanation & Chat**: Add a "Chat" mode where users can ask follow-up questions about the generated code or request refactors.
3.  **User Accounts**: Implement Supabase or Firebase Auth to sync history across devices.
4.  **Multiple Files**: Allow generating multiple related files (e.g., a component and its CSS) in one go.
5.  **Unit Tests**: Add comprehensive unit tests using Vitest and React Testing Library to ensure reliability.

---

## 🔌 Example API Payload

Although this project is now frontend-only, it communicates with the OpenRouter API. Here is the structure of the payload sent to the LLM:

**Endpoint**: `https://openrouter.ai/api/v1/chat/completions`

**Request Body:**
```json
{
  "model": "openai/gpt-4o",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert coding assistant. Generate clean, production-ready python code based on the user's request. Provide ONLY the code, no explanations."
    },
    {
      "role": "user",
      "content": "Create a function to calculate the fibonacci sequence"
    }
  ]
}
```
#
