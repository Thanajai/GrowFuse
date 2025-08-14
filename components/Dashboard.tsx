

import React, { useState } from 'react';
import type { User, Farm, SoilType, CropRecommendation, SavedRecommendation } from '../types';
import { Language } from '../types';
import { UI_TEXT, SOIL_TYPES, SOIL_TYPE_TRANSLATIONS } from '../constants';
import Modal from './Modal';
import { PlusIcon, FarmIcon, ListIcon, SproutIcon } from './IconComponents';
import CropCard from './CropCard';
import ExpandedCropCard from './ExpandedCropCard';

interface DashboardProps {
  user: User;
  onUpdateUser: (user: User) => void;
  language: Language;
}

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => (
    <div className={`p-6 rounded-xl shadow-lg flex items-center space-x-4 ${color}`}>
        <div className="bg-white/20 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-white/80">{label}</p>
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateUser, language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFarmName, setNewFarmName] = useState('');
  const [newFarmLocation, setNewFarmLocation] = useState('');
  const [newFarmSoilType, setNewFarmSoilType] = useState<SoilType | ''>('');
  const [newFarmLandArea, setNewFarmLandArea] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(null);

  const handleAddFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmName || !newFarmLocation || !newFarmSoilType || !newFarmLandArea) return;

    const newFarm: Farm = {
      id: `farm_${new Date().getTime()}`,
      name: newFarmName,
      location: newFarmLocation,
      soilType: newFarmSoilType as SoilType,
      landArea: parseFloat(newFarmLandArea),
    };

    onUpdateUser({
      ...user,
      farms: [...user.farms, newFarm],
    });

    // Reset form and close modal
    setNewFarmName('');
    setNewFarmLocation('');
    setNewFarmSoilType('');
    setNewFarmLandArea('');
    setIsModalOpen(false);
  };
  
  const getRecommendationsForFarm = (farmId: string): SavedRecommendation[] => {
    return user.savedRecommendations
      .filter(rec => rec.farmId === farmId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const handleOpenCrop = (crop: CropRecommendation) => {
    setSelectedCrop(crop);
  };

  const handleCloseCrop = () => {
    setSelectedCrop(null);
  };

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${selectedCrop ? 'blur-md' : 'blur-none'}`} >
        <div className="animate-fadeInUp opacity-0" style={{ animationDelay: '100ms' }}>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green-dark dark:text-brand-green-light">
              {UI_TEXT[language].welcome}, {user.name}!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Here's an overview of your agricultural world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatCard 
                icon={<FarmIcon className="w-8 h-8 text-white"/>} 
                label="Total Farms"
                value={user.farms.length}
                color="bg-gradient-to-br from-teal-400 to-green-500"
              />
              <StatCard 
                icon={<ListIcon className="w-8 h-8 text-white"/>} 
                label={UI_TEXT[language].savedRecommendations}
                value={user.savedRecommendations.length}
                color="bg-gradient-to-br from-orange-400 to-amber-500"
              />
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/50 dark:border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{UI_TEXT[language].myFarms}</h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="py-2 px-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                >
                  <PlusIcon className="w-5 h-5" />
                  {UI_TEXT[language].addFarm}
                </button>
            </div>
            {user.farms.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <SproutIcon className="w-16 h-16 mx-auto text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400 mt-4">{UI_TEXT[language].noFarms}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {user.farms.map(farm => (
                  <div key={farm.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-semibold text-brand-green-dark dark:text-brand-green-light">{farm.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {farm.location} | {SOIL_TYPE_TRANSLATIONS[farm.soilType][language]} {UI_TEXT[language].soilSuffix} | {farm.landArea} acres
                    </p>
                    <div className="mt-6">
                      <h5 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{UI_TEXT[language].savedRecommendations}</h5>
                      {getRecommendationsForFarm(farm.id).length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{UI_TEXT[language].noSavedRecommendations}</p>
                      ) : (
                        <div className="space-y-6">
                            {getRecommendationsForFarm(farm.id).map(savedRec => (
                                 <div key={savedRec.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-md">
                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">
                                        {new Date(savedRec.date).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })} - {savedRec.inputs.forecastDuration} Month Forecast
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                        {savedRec.recommendations.map((crop, index) => (
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
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen && !selectedCrop} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddFarm} className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{UI_TEXT[language].addFarm}</h3>
          <div>
            <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT[language].farmName}</label>
            <input
              id="farmName"
              type="text"
              value={newFarmName}
              onChange={e => setNewFarmName(e.target.value)}
              placeholder={UI_TEXT[language].farmNamePlaceholder}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-glow-green focus:border-brand-green transition-shadow duration-300"
            />
          </div>
          <div>
            <label htmlFor="farmLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT[language].locationLabel}</label>
            <input
              id="farmLocation"
              type="text"
              value={newFarmLocation}
              onChange={e => setNewFarmLocation(e.target.value)}
              placeholder={UI_TEXT[language].locationPlaceholder}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-glow-green focus:border-brand-green transition-shadow duration-300"
            />
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                    <label htmlFor="farmSoilType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT[language].soilTypeLabel}</label>
                    <select
                        id="farmSoilType"
                        value={newFarmSoilType}
                        onChange={e => setNewFarmSoilType(e.target.value as SoilType)}
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-glow-green focus:border-brand-green transition-shadow duration-300"
                    >
                        <option value="" disabled>{UI_TEXT[language].selectSoilType}</option>
                        {SOIL_TYPES.map(type => <option key={type} value={type}>{SOIL_TYPE_TRANSLATIONS[type][language]}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="farmLandArea" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{UI_TEXT[language].landAreaLabel}</label>
                    <input
                      id="farmLandArea"
                      type="number"
                      value={newFarmLandArea}
                      onChange={e => setNewFarmLandArea(e.target.value)}
                      placeholder={UI_TEXT[language].landAreaPlaceholder}
                      required
                      min="0.1"
                      step="0.1"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-glow-green focus:border-brand-green transition-shadow duration-300"
                    />
                </div>
           </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="py-2 px-4 text-gray-700 dark:text-gray-300 font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{UI_TEXT[language].cancel}</button>
            <button type="submit" className="py-2 px-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-lg shadow-md transition-colors">{UI_TEXT[language].saveFarm}</button>
          </div>
        </form>
      </Modal>

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

export default Dashboard;
