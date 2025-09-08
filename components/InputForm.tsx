import React from 'react';
import { SOIL_TYPES, UI_TEXT, FORECAST_DURATIONS, SOIL_TYPE_TRANSLATIONS, CROP_TYPES, CROP_TYPE_TRANSLATIONS } from '../constants';
import { Language, SoilType, ForecastDuration, CropType } from '../types';

interface InputFormProps {
  location: string;
  setLocation: (value: string) => void;
  locationError: string | null;
  soilType: SoilType | '';
  setSoilType: (value: SoilType | '') => void;
  landArea: string;
  setLandArea: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  language: Language;
  forecastDuration: ForecastDuration;
  setForecastDuration: (value: ForecastDuration) => void;
  cropType: CropType;
  setCropType: (value: CropType) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  location,
  setLocation,
  locationError,
  soilType,
  setSoilType,
  landArea,
  setLandArea,
  handleSubmit,
  isLoading,
  language,
  forecastDuration,
  setForecastDuration,
  cropType,
  setCropType
}) => {
  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-brand-dark-tertiary rounded-xl shadow-2xl space-y-6 w-full max-w-4xl mx-auto border border-gray-200 dark:border-gray-700/50 transition-colors duration-300">
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-600 dark:text-brand-light-secondary">
          {UI_TEXT[language].locationLabel}
        </label>
        <input
          id="location"
          type="tel"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={UI_TEXT[language].locationPlaceholder}
          required
          maxLength={6}
          pattern="\d{6}"
          className={`w-full px-4 py-2 border rounded-lg bg-brand-light-secondary dark:bg-brand-dark-secondary text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300 ${locationError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600/60'}`}
          aria-invalid={!!locationError}
          aria-describedby="location-error"
        />
        {locationError && <p id="location-error" className="text-sm text-red-600 dark:text-red-400 mt-1">{locationError}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label htmlFor="soilType" className="block text-sm font-medium text-gray-600 dark:text-brand-light-secondary">
            {UI_TEXT[language].soilTypeLabel}
          </label>
          <select
            id="soilType"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value as SoilType)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600/60 rounded-lg bg-brand-light-secondary dark:bg-brand-dark-secondary text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
          >
            <option value="" disabled>{UI_TEXT[language].selectSoilType}</option>
            {SOIL_TYPES.map((type) => (
              <option key={type} value={type}>{SOIL_TYPE_TRANSLATIONS[type][language]}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="cropType" className="block text-sm font-medium text-gray-600 dark:text-brand-light-secondary">
            {UI_TEXT[language].cropTypeLabel}
          </label>
          <select
            id="cropType"
            value={cropType}
            onChange={(e) => setCropType(e.target.value as CropType)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600/60 rounded-lg bg-brand-light-secondary dark:bg-brand-dark-secondary text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
          >
            {CROP_TYPES.map((type) => (
              <option key={type} value={type}>{CROP_TYPE_TRANSLATIONS[type][language]}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="landArea" className="block text-sm font-medium text-gray-600 dark:text-brand-light-secondary">
            {UI_TEXT[language].landAreaLabel}
          </label>
          <input
            id="landArea"
            type="number"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            placeholder={UI_TEXT[language].landAreaPlaceholder}
            required
            min="0.1"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600/60 rounded-lg bg-brand-light-secondary dark:bg-brand-dark-secondary text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
           <label htmlFor="forecastDuration" className="block text-sm font-medium text-gray-600 dark:text-brand-light-secondary">
            {UI_TEXT[language].forecastPeriodLabel}
          </label>
          <select
            id="forecastDuration"
            value={forecastDuration}
            onChange={(e) => setForecastDuration(e.target.value as ForecastDuration)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600/60 rounded-lg bg-brand-light-secondary dark:bg-brand-dark-secondary text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
          >
            {FORECAST_DURATIONS.map((duration) => (
              <option key={duration} value={duration}>
                {duration === ForecastDuration.SIX_MONTHS ? UI_TEXT[language].sixMonths : UI_TEXT[language].twelveMonths}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="relative overflow-hidden w-full py-3 px-4 bg-gradient-to-r from-brand-green to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-green/40 dark:hover:shadow-brand-green/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:bg-gray-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex justify-center items-center group"
      >
        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
        <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/30 to-transparent opacity-50 animate-shimmer group-hover:animate-none -translate-x-full transition-transform duration-1000"></span>
        
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <span className="relative z-10">{UI_TEXT[language].getRecommendations}</span>
        )}
      </button>
    </form>
  );
};

export default InputForm;
