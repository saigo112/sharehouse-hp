import React from 'react';
import Image from 'next/image';

interface PolaroidProps {
  src: string;
  alt: string;
  caption: string;
  rotate?: string; // e.g., ''
  className?: string;
}

export const Polaroid: React.FC<PolaroidProps> = ({ 
  src, 
  alt, 
  caption, 
  rotate = '', 
  className = '' 
}) => {
  return (
    <div className={`bg-surface-container-lowest p-4 pb-12 shadow-polaroid rounded-sm transform transition-all duration-500 hover:scale-105 ${rotate} ${className}`}>
      <div className="relative aspect-square overflow-hidden mb-6 bg-surface-container-low">
        {src ? (
          <Image 
            src={src} 
            alt={alt} 
            fill 
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30">
            No Image
          </div>
        )}
      </div>
      <p className="font-handwriting text-2xl text-on-surface-variant text-center tracking-wide">
        {caption}
      </p>
    </div>
  );
};
