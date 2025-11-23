import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function WarningPopup({ message, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-yellow-500 dark:border-yellow-600 p-6 max-w-md w-full mx-4 animate-scale-in">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
                            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Warning
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Message */}
                <div className="mb-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Action Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                    I Understand
                </button>
            </div>
        </div>
    );
}
