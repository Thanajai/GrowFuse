
import React, { useState } from 'react';
import type { HistoryEntry, CropRecommendation } from '../types';
import { Language } from '../types';
import { UI_TEXT, SOIL_TYPE_TRANSLATIONS } from '../constants';
import CropCard from './CropCard';
import ExpandedCropCard from './ExpandedCropCard';
import { ArrowLeftIcon } from './IconComponents';

interface HistoryViewProps {
  history: HistoryEntry[];
  language: Language;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, language }) => {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(null);

  const selectedEntry = history.find(entry => entry.id === selectedEntryId) || null;

  const handleOpenCrop = (crop: CropRecommendation) => {
    setSelectedCrop(crop);
  };

  const handleCloseCrop = () => {
    setSelectedCrop(null);
  };
  
  const handleBackToList = () => {
    setSelectedEntryId(null);
  };

  if (history.length === 0) {
    return (
      <div className="text-center p-12 bg-brand-light-secondary dark:bg-brand-dark-tertiary/50 rounded-lg shadow-inner animate-fadeInUp">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-brand-light mb-4">{UI_TEXT[language].recommendationHistory}</h2>
        <p className="text-xl text-gray-500 dark:text-gray-400">{UI_TEXT[language].noHistory}</p>
      </div>
    );
  }

  if (selectedEntry) {
    return (
      <div className="relative animate-fadeInUp">
        {selectedCrop && (
            <ExpandedCropCard 
                crop={selectedCrop} 
                language={language} 
                onClose={handleCloseCrop} 
            />
        )}
        <div className={`transition-all duration-300 ${selectedCrop ? 'blur-sm' : 'blur-none'}`}>
            <button 
                onClick={handleBackToList}
                className="flex items-center gap-2 text-brand-green hover:text-green-600 dark:hover:text-green-300 mb-6 font-semibold"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to History
            </button>
            <div className="bg-white dark:bg-brand-dark-tertiary rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedEntry.name}</h3>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {new Date(selectedEntry.date).toLocaleString(language, { dateStyle: 'long', timeStyle: 'short' })}
                </p>
                
                <div className="mb-6 p-4 bg-brand-light-secondary dark:bg-brand-dark-secondary rounded-lg border border-gray-300 dark:border-gray-600">
                    <h4 className="font-semibold text-lg text-gray-800 dark:text-brand-light mb-2">{UI_TEXT[language].inputs}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {selectedEntry.inputs.location} | {SOIL_TYPE_TRANSLATIONS[selectedEntry.inputs.soilType][language]} | {selectedEntry.inputs.landArea} acres | {selectedEntry.inputs.forecastDuration} Month Forecast
                    </p>
                </div>

                <h4 className="font-semibold text-lg text-gray-800 dark:text-brand-light mb-4">{UI_TEXT[language].recommendations}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {selectedEntry.recommendations.map((crop, index) => (
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
        </div>
      </div>
    );
  }


  return (
    <div className="animate-fadeInUp">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-brand-light mb-8">{UI_TEXT[language].recommendationHistory}</h2>
      <div className="space-y-4">
        {history.map(entry => (
          <button
            key={entry.id}
            onClick={() => setSelectedEntryId(entry.id)}
            className="w-full text-left p-6 bg-white dark:bg-brand-dark-tertiary rounded-lg shadow-lg hover:bg-brand-light-secondary dark:hover:bg-gray-700/80 transition-all duration-200 border border-gray-200 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-brand-green group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xl text-gray-900 dark:text-white truncate group-hover:text-brand-green">{entry.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(entry.date).toLocaleString(language, { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{entry.inputs.location}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{entry.recommendations.length} recommendations</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
