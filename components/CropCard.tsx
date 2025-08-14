import React, { useState } from 'react';
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

  const scoreColorClass =
    crop.confidenceScore >= 90
      ? 'bg-green-500 text-white'
      : 'bg-amber-500 text-brand-dark font-semibold';

  return (
    <button
      onClick={onClick}
      className="text-left w-full bg-brand-dark-tertiary rounded-xl overflow-hidden transition-all duration-300 opacity-0 animate-fadeInUp group border border-brand-light/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-secondary focus:ring-teal-400"
      style={{ animationDelay: `${index * 100}ms` }}
      aria-label={`View details for ${crop.cropName}`}
    >
      <div className="w-full h-48 bg-brand-dark-secondary overflow-hidden">
        {!imageError ? (
          <img 
            src={crop.imageUrl} 
            alt={crop.cropName} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <p className="text-gray-400 font-semibold text-center">{crop.cropName}</p>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-teal-400 mb-2 truncate">{crop.cropName}</h3>
        <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden text-ellipsis">{crop.justification}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{UI_TEXT[language].confidence}</span>
          <div className={`text-sm font-bold py-1 px-3 rounded-full ${scoreColorClass}`}>
            {Math.round(crop.confidenceScore)}%
          </div>
        </div>
      </div>
    </button>
  );
};

export default CropCard;