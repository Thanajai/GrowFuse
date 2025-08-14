
import React, { useState, useEffect } from 'react';
import type { CropRecommendation } from '../types';
import { Language } from '../types';
import { UI_TEXT } from '../constants';
import CropCard from './CropCard';
import LoadingSpinner from './LoadingSpinner';
import ExpandedCropCard from './ExpandedCropCard';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  results: CropRecommendation[];
  language: Language;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, results, language }) => {
  const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(null);

  const handleOpenCrop = (crop: CropRecommendation) => {
    setSelectedCrop(crop);
  };

  const handleCloseCrop = () => {
    setSelectedCrop(null);
  };

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-gray-600 dark:text-brand-light-secondary">{UI_TEXT[language].loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-600 rounded-lg">
        <p className="text-red-700 dark:text-red-200 font-semibold">{UI_TEXT[language].error}</p>
        <p className="text-red-600 dark:text-red-300 mt-2">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-12 bg-gray-100 dark:bg-brand-dark-tertiary/50 rounded-lg shadow-inner">
        <p className="text-xl text-gray-500 dark:text-gray-400">{UI_TEXT[language].noResults}</p>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className={`transition-all duration-300 ${selectedCrop ? 'blur-sm' : 'blur-none'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-brand-light">
            {UI_TEXT[language].recommendationsTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {results.map((crop, index) => (
            <CropCard 
                key={`${crop.englishCropName}-${index}`} 
                crop={crop} 
                language={language} 
                index={index} 
                onClick={() => handleOpenCrop(crop)}
            />
          ))}
        </div>
      </div>

      {selectedCrop && (
        <ExpandedCropCard 
            crop={selectedCrop} 
            language={language} 
            onClose={handleCloseCrop} 
        />
      )}
    </div>
  );
};

export default ResultsDisplay;
