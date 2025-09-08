import React from 'react';
import { SunIcon, MoonIcon, LanguageIcon, GrowFuseLogo, HomeIcon, HistoryIcon } from './IconComponents';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onSetView: (view: 'recommender' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, language, setLanguage, onSetView }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-brand-dark-tertiary/60 transition-colors duration-300">
      {/* Animated Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-400 dark:from-emerald-800/80 dark:via-cyan-800/80 dark:to-teal-700/80 [background-size:200%_auto] animate-gradient-pan opacity-80 dark:opacity-50"></div>
      
      <div className="relative container mx-auto px-6 md:px-12 py-3 flex justify-between items-center text-brand-dark dark:text-brand-light flex-wrap gap-4">
        <button onClick={() => onSetView('recommender')} className="flex items-center group">
          <GrowFuseLogo className="h-8 w-auto" />
        </button>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => onSetView('recommender')}
            className="p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
            aria-label="Home"
          >
            <HomeIcon className="w-6 h-6" />
          </button>
           <button
            onClick={() => onSetView('history')}
            className="p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
            aria-label="History"
          >
            <HistoryIcon className="w-6 h-6" />
          </button>
          <div className="relative">
            <LanguageIcon className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="pl-10 pr-4 py-2 bg-white/40 dark:bg-black/40 text-brand-dark dark:text-brand-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none border border-transparent"
              aria-label="Select language"
            >
              <option value={Language.ENGLISH}>English</option>
              <option value={Language.HINDI}>हिन्दी</option>
              <option value={Language.TAMIL}>தமிழ்</option>
              <option value={Language.TELUGU}>తెలుగు</option>
              <option value={Language.KANNADA}>ಕನ್ನಡ</option>
              <option value={Language.BENGALI}>বাংলা</option>
              <option value={Language.MARATHI}>मराठी</option>
              <option value={Language.PUNJABI}>ਪੰਜਾਬੀ</option>
            </select>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;