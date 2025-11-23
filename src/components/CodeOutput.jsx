import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardDocumentIcon, CheckIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const FONT_SIZES = [12, 14, 16, 18];

export default function CodeOutput({ code, language, isDarkMode }) {
    const [copied, setCopied] = useState(false);
    const [fontSizeIndex, setFontSizeIndex] = useState(1); // Default to 14

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const increaseFontSize = () => {
        if (fontSizeIndex < FONT_SIZES.length - 1) {
            setFontSizeIndex(fontSizeIndex + 1);
        }
    };

    const decreaseFontSize = () => {
        if (fontSizeIndex > 0) {
            setFontSizeIndex(fontSizeIndex - 1);
        }
    };

    if (!code) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full flex items-center justify-center transition-colors duration-300">
                <div className="text-center">
                    <div className="inline-flex p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full mb-4">
                        <CodeBracketIcon className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No code generated yet
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                        Enter a prompt and click "Generate Code" to see your code here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col transition-colors duration-300">
            <div className="bg-gray-50 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 px-5 py-3.5 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-md uppercase tracking-wide">
                        {language || 'code'}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Font Size Controls */}
                    <div className="flex items-center gap-2 border-r border-gray-300 dark:border-gray-600 pr-3">
                        <button
                            onClick={decreaseFontSize}
                            disabled={fontSizeIndex === 0}
                            className="p-1.5 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            title="Decrease font size"
                            aria-label="Decrease font size"
                        >
                            <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="text-gray-600 dark:text-gray-300 text-xs font-mono min-w-[32px] text-center">
                            {FONT_SIZES[fontSizeIndex]}px
                        </span>
                        <button
                            onClick={increaseFontSize}
                            disabled={fontSizeIndex === FONT_SIZES.length - 1}
                            className="p-1.5 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            title="Increase font size"
                            aria-label="Increase font size"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1.5 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all text-sm font-medium"
                        aria-label="Copy code to clipboard"
                    >
                        {copied ? (
                            <>
                                <CheckIcon className="h-4 w-4 text-green-500 dark:text-green-400" />
                                <span className="text-green-600 dark:text-green-400">Copied!</span>
                            </>
                        ) : (
                            <>
                                <ClipboardDocumentIcon className="h-4 w-4" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className={`flex-1 overflow-auto ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                <SyntaxHighlighter
                    language={language || 'javascript'}
                    style={isDarkMode ? vscDarkPlus : vs}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        fontSize: `${FONT_SIZES[fontSizeIndex]}px`,
                        lineHeight: '1.6',
                        background: isDarkMode ? '#1e1e1e' : '#ffffff',
                    }}
                    showLineNumbers
                    lineNumberStyle={{
                        minWidth: '3em',
                        paddingRight: '1em',
                        color: isDarkMode ? '#858585' : '#a0a0a0',
                        userSelect: 'none',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
