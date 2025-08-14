import React, { useEffect } from 'react';
import type { CropRecommendation } from '../types';
import { Language } from '../types';
import { UI_TEXT } from '../constants';
import { ArrowLeftIcon, XIcon } from './IconComponents';

interface ExpandedCropCardProps {
  crop: CropRecommendation;
  language: Language;
  onClose: () => void;
}

const ExpandedCropCard: React.FC<ExpandedCropCardProps> = ({ crop, language, onClose }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
         onClose();
       }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const scoreColor =
    crop.confidenceScore > 85
      ? 'bg-green-500'
      : crop.confidenceScore > 70
      ? 'bg-yellow-500'
      : 'bg-orange-500';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-backdropFadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white dark:bg-brand-dark-secondary rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-slideInDown relative border border-gray-200 dark:border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <img src={crop.imageUrl} alt={crop.cropName} className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none" />

        <div className="p-8 flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-4xl font-extrabold text-brand-green-dark dark:text-brand-green mb-4">{crop.cropName}</h2>
            <p className="text-gray-700 dark:text-brand-light-secondary text-base mb-6">{crop.justification}</p>
          </div>
          <div className="flex justify-between items-center mt-4 border-t border-gray-200 dark:border-gray-700 pt-6">
            <span className="text-lg font-bold text-gray-800 dark:text-brand-light">{UI_TEXT[language].confidence}</span>
            <div className="flex items-center gap-3">
              <div className="w-40 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`${scoreColor} h-2.5 rounded-full`} 
                  style={{ width: `${crop.confidenceScore}%` }}
                ></div>
              </div>
              <div className={`${scoreColor} text-white text-lg font-bold py-1 px-4 rounded-full`}>
                {Math.round(crop.confidenceScore)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCropCard;