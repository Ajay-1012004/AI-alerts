'use client';

import { useState } from 'react';

export default function InfoForm({ onAnalyze }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClear = () => setText('');
  const handleCopy = () => navigator.clipboard.writeText(text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAnalyze(text, setLoading); // Don't forget to call setLoading(false) inside onAnalyze
  };

  return (
    <div className="relative">
      {/* Fullscreen Blur and Custom Spinner */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/40">
          <div className="flex flex-col items-center space-y-4">
            {/* Dual Ring Spinner */}
            <div className="w-12 h-12 border-4 border-sky-600 border-dashed rounded-full animate-spin border-t-transparent" />
            <p className="text-sky-700 font-semibold text-lg">Analyzing...</p>
          </div>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows="6"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type a news article here..."
          className="w-full p-4 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 resize-y shadow-sm"
          required
        />
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{text.length} characters</span>
          <div className="space-x-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Copy
            </button>
            <button
              type="submit"
              className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
