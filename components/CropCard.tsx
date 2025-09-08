import React, { useState, useRef, useEffect } from 'react';
import type { CropRecommendation } from '../types';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface CropCardProps {
  crop: CropRecommendation;
  language: Language;
  index: number;
  onClick: () => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, language, index, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8; // Max rotation
      const rotateY = ((x - centerX) / centerX) * 8; // Max rotation

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scoreColorClass =
    crop.confidenceScore >= 90
      ? 'bg-green-500 text-white'
      : 'bg-amber-500 text-brand-dark font-semibold';

  const handleImageError = () => {
    console.error(`Failed to load image for ${crop.englishCropName} from URL: ${crop.imageUrl}`);
    setImageError(true);
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className="text-left w-full h-72 bg-brand-dark-tertiary rounded-xl overflow-hidden transition-all duration-300 opacity-0 animate-fadeInUp group relative border border-brand-light/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-secondary focus:ring-teal-400"
      style={{ 
        animationDelay: `${index * 100}ms`,
        transformStyle: 'preserve-3d',
       }}
      aria-label={`View details for ${crop.cropName}`}
    >
      {/* Background Image */}
      {!imageError ? (
        <img 
          src={crop.imageUrl} 
          alt={crop.cropName} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          style={{ transform: 'translateZ(20px)' }}
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-brand-dark-tertiary to-brand-dark-secondary" style={{ transform: 'translateZ(20px)' }}>
          {/* Fallback display uses the centered title which is overlaid on top of this */}
        </div>
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" style={{ transform: 'translateZ(30px)' }}></div>

      {/* Centered Title (Visible on unhovered state) */}
      <div className="absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0" style={{ transform: 'translateZ(40px)' }}>
        <h3 className="text-2xl font-bold text-white text-center tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          {crop.cropName}
        </h3>
      </div>
      
      {/* Details Pane (Slides up on hover) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out" style={{ transform: 'translateZ(50px)' }}>
        <h3 className="text-xl font-bold text-teal-400 mb-2 truncate">{crop.cropName}</h3>
        <p className="text-gray-300 text-sm mb-4 h-16 overflow-hidden text-ellipsis leading-snug">{crop.justification}</p>
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/20">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{UI_TEXT[language].confidence}</span>
          <div className={`text-sm font-bold py-1 px-3 rounded-full ${scoreColorClass}`}>
            {Math.round(crop.confidenceScore)}%
          </div>
        </div>
      </div>
    </button>
  );
};

export default CropCard;