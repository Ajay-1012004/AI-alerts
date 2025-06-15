'use client';

import InfoCard from './InfoCard';

export default function InfoDisplay({ info }) {
  const formatKey = (str) =>
    str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());

  const getIcon = (key) => {
    const icons = {
      places: '🌍',
      topics: '🧩',
      safetyincs: '🚨',
      summary: '📝',
      sentiment: '🧠',
      people: '👥',
      organizations: '🏢',
      title: '📰',
      category: '🗂️',
      orgbizs: '📌',
      profjobs: '📌',
      skills: '📌',
      eduinstitutes: '📌',
      personroles: '📌',
      indsects: '📌',
    };
    return icons[key.toLowerCase()] || '📌';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {Object.entries(info).map(([key, value]) => (
        <InfoCard
          key={key}
          title={formatKey(key)}
          icon={getIcon(key)}
          content={value}
        />
      ))}
    </div>
  );
}