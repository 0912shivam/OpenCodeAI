import { useState, useEffect } from 'react';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import CodeOutput from '../components/CodeOutput';
import HistoryPanel from '../components/HistoryPanel';
import { generateCode } from '../utils/api';

export default function Home() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load dark mode preference on mount
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode.toString());

        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Load history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('history');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (err) {
                console.error('Failed to load history:', err);
            }
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem('history', JSON.stringify(history));
        }
    }, [history]);

    const handleGenerate = async (prompt, selectedLanguage) => {
        setIsLoading(true);
        setError(null);

        // Set the language immediately from dropdown selection
        setLanguage(selectedLanguage);

        try {
            const result = await generateCode(prompt, selectedLanguage);
            setCode(result.code);
            // Keep the user's selected language, not the backend's response
            setLanguage(selectedLanguage);

            // Add to history
            const historyItem = {
                prompt: result.prompt,
                code: result.code,
                language: selectedLanguage, // Use the user's selected language
                timestamp: new Date().toISOString(),
                favorite: false,
            };
            setHistory([historyItem, ...history]);
        } catch (err) {
            setError('Failed to generate code. Please ensure the backend server is running.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectHistory = (item) => {
        setCode(item.code);
        setLanguage(item.language);
    };

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear all history?')) {
            setHistory([]);
            localStorage.removeItem('history');
        }
    };

    const handleToggleFavorite = (index) => {
        const newHistory = [...history];
        newHistory[index].favorite = !newHistory[index].favorite;
        setHistory(newHistory);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-950 transition-colors duration-300">
            <div className="container mx-auto px-4 py-6">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                {error && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-5 py-4 rounded-xl animate-fade-in shadow-sm">
                        <div className="flex items-start gap-3">
                            <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="font-semibold text-sm">Connection Error</p>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Prompt Input and History */}
                    <div className="flex flex-col gap-6">
                        <div className="animate-slide-in-left">
                            <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
                        </div>

                        {/* History Panel */}
                        <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                            <HistoryPanel
                                history={history}
                                onSelectHistory={handleSelectHistory}
                                onClearHistory={handleClearHistory}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        </div>
                    </div>

                    {/* Right Side - Code Output */}
                    <div className="animate-slide-in-right">
                        <CodeOutput code={code} language={language} isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );
}
