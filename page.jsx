'use client';

import { useState } from 'react';
import InfoForm from './components/InfoForm';
import InfoDisplay from './components/InfoDisplay';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

export default function HomePage() {
  const [info, setInfo] = useState(null);
  const [toast, setToast] = useState(null);

  const handleAnalyze = async (text, setLoading) => {
    try {
      const res = await fetch('/api/fetch-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok || !data || typeof data !== 'object') {
        throw new Error(data?.error || 'Invalid response from server');
      }

      if (!Object.keys(data).length) {
        throw new Error('No extracted information found.');
      }

      setInfo(data);
      setToast({ type: 'success', message: 'Info extracted successfully!' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: err.message || 'Failed to extract info.' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-sky-800 mb-6">Security and Safety Analyzer</h1>
        <InfoForm onAnalyze={handleAnalyze} />
        {info && <InfoDisplay info={info} />}
      </main>
      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
}