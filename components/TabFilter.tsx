import { cn } from '../lib/utils';

interface TabFilterProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export default function TabFilter({ tags, activeTag, onTagChange }: TabFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      <button
        onClick={() => onTagChange('全部')}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
          activeTag === '全部'
            ? 'bg-blue-500 text-white'
            : [
                'bg-gray-100 dark:bg-gray-800',
                'text-gray-700 dark:text-gray-200',
                'hover:bg-gray-200 dark:hover:bg-gray-700',
                'border border-gray-200 dark:border-gray-700'
              ]
        )}
      >
        全部
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
            activeTag === tag
              ? 'bg-blue-500 text-white'
              : [
                  'bg-gray-100 dark:bg-gray-800',
                  'text-gray-700 dark:text-gray-200',
                  'hover:bg-gray-200 dark:hover:bg-gray-700',
                  'border border-gray-200 dark:border-gray-700'
                ]
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
} 