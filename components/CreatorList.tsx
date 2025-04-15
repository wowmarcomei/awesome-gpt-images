'use client';

import { FaXTwitter } from 'react-icons/fa6';

const creators = [
  { name: 'balconychy', count: 5, twitter: 'https://twitter.com/balconychy' },
  { name: 'dotey', count: 10, twitter: 'https://twitter.com/dotey' },
  { name: 'AnimeAI', count: 2, twitter: 'https://twitter.com/AnimeAI' },
  { name: 'ZHO_ZHO_ZHO', count: 7, twitter: 'https://twitter.com/ZHO_ZHO_ZHO' },
];

export default function CreatorList() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
        创作者
      </h2>
      <div className="space-y-1">
        {creators.map((creator) => (
          <a
            key={creator.name}
            href={creator.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FaXTwitter className="w-4 h-4 text-blue-400" />
              <span>{creator.name}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700">
              {creator.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
} 