import { SparklesIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Header({ isDarkMode, toggleDarkMode }) {
    return (
        <header className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl shadow-lg p-6 transition-colors duration-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                            <SparklesIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Mini Code Copilot
                            </h1>
                            <p className="text-sm text-indigo-100 mt-1">
                                Your AI-powered coding assistant
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <SunIcon className="h-6 w-6 text-white" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-white" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
