'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';

const images = [
  {
    id: 1,
    title: 'Q版求婚场景',
    author: 'balconychy',
    authorTwitter: 'https://twitter.com/balconychy',
    imageUrl: '/images/proposal.jpg',
    tags: ['Q版', '3D', '求婚'],
    description: '将照片里的两个人转换成Q版3D人物，场景是求婚场景，背景是玫瑰花拱门，地上落满玫瑰花瓣。除了人物外，其他环境成风格化的写实风格。'
  },
  // ... 其他图片
];

export default function ImageList() {
  return (
    <>
      {images.map((image) => (
        <div key={image.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="relative aspect-[4/3]">
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{image.title}</h3>
              <a
                href={image.authorTwitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500"
              >
                <FaTwitter className="w-4 h-4" />
                {image.author}
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {image.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
} 