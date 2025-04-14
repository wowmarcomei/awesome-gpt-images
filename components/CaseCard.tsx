import { Case } from '../types';
import { motion } from 'framer-motion';
import { FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

interface CaseCardProps {
  case: Case;
  onTagClick?: (tag: string) => void;
}

export default function CaseCard({ case: caseData, onTagClick }: CaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative w-full pt-[75%] mt-4">
        <Image
          src={caseData.imageUrl}
          alt={caseData.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
          priority={false}
          quality={75}
        />
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {caseData.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <a
            href={caseData.author.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaTwitter className="mr-1" />
            <span className="text-sm">{caseData.author.name}</span>
          </a>
        </div>
        
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            提示词：
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {caseData.prompt}
          </p>
        </div>
        
        
        
        <div className="flex flex-wrap gap-2 mb-4">
          {caseData.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick?.(tag)}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
        
        <a
          href={caseData.originalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block text-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          查看原文
        </a>
      </div>
    </motion.div>
  );
} 