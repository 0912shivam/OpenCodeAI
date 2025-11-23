import { useState } from 'react';
import { isCodingPrompt } from '../utils/promptCheck';
import { SparklesIcon } from '@heroicons/react/24/solid';
import WarningPopup from './WarningPopup';

const LANGUAGES = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
];


export default function PromptInput({ onGenerate, isLoading }) {
    const [prompt, setPrompt] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [showWarning, setShowWarning] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        // Check if prompt is coding-related
        if (!isCodingPrompt(prompt)) {
            setShowWarning(true);
            return;
        }

        onGenerate(prompt, language);
    };

    return (
        <>
            {showWarning && (
                <WarningPopup
                    message="⚠️ This app is designed for code generation only. Please ask coding-related questions or describe the code you want to generate. Examples: 'Create a function to sort an array', 'Write a React component', 'Generate a Python class', etc."
                    onClose={() => setShowWarning(false)}
                />
            )}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col transition-colors">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                    Enter Your Prompt
                </h2>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    {/* Language Dropdown */}
                    <div className="mb-4">
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Programming Language
                        </label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                            {LANGUAGES.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Prompt Textarea */}
                    <div className="flex-1 mb-10">
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Code Description
                        </label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the code you want to generate... (e.g., 'Create a function to sort an array')"
                            className="w-full h-full min-h-[200px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 transition-colors"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!prompt.trim() || isLoading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="h-5 w-5" />
                                <span>Generate Code</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
