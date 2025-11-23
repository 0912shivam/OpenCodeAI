import { ClockIcon, TrashIcon, MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

// All available languages
const ALL_LANGUAGES = [
    { value: 'all', label: 'All Languages' },
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

export default function HistoryPanel({ history, onSelectHistory, onClearHistory, onToggleFavorite }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [languageFilter, setLanguageFilter] = useState('all');

    // Filter history based on search and language
    const filteredHistory = history.filter(item => {
        const matchesSearch = item.prompt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLanguage = languageFilter === 'all' || item.language === languageFilter;
        return matchesSearch && matchesLanguage;
    });

    if (history.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    History
                </h2>
                <div className="text-center py-12">
                    <ClockIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                        No history yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-600 text-xs mt-1">
                        Generated code will appear here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    History
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        ({filteredHistory.length})
                    </span>
                </h2>
                <button
                    onClick={onClearHistory}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm flex items-center gap-1.5 transition-colors font-medium"
                >
                    <TrashIcon className="h-4 w-4" />
                    Clear
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-3">
                <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                    />
                </div>
            </div>

            {/* Language Filter */}
            <div className="mb-4">
                <select
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                >
                    {ALL_LANGUAGES.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {filteredHistory.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400 dark:text-gray-500 text-sm">
                            No matching results
                        </p>
                    </div>
                ) : (
                    filteredHistory.map((item, index) => (
                        <div
                            key={index}
                            className="relative group p-3.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all cursor-pointer"
                        >
                            <button
                                onClick={() => onSelectHistory(item)}
                                className="w-full text-left"
                            >
                                <p className="text-sm text-gray-900 dark:text-white font-medium truncate pr-8 mb-1">
                                    {item.prompt}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 rounded font-medium">
                                        {item.language}
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                                </div>
                            </button>

                            {/* Favorite Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite(index);
                                }}
                                className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                                aria-label={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                {item.favorite ? (
                                    <StarIconSolid className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                                ) : (
                                    <StarIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
