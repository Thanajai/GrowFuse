import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryView from './components/HistoryView';
import { getAgroRecommendations } from './services/geminiService';
import * as historyService from './services/historyService';
import type { CropRecommendation, SoilType, HistoryEntry } from './types';
import { Language, ForecastDuration, CropType } from './types';
import { UI_TEXT } from './constants';
import { LeftIllustration, RightIllustration } from './components/IconComponents';
import ParticleBackground from './components/ParticleBackground';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  
  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [soilType, setSoilType] = useState<SoilType | ''>('');
  const [landArea, setLandArea] = useState('');
  const [forecastDuration, setForecastDuration] = useState<ForecastDuration>(ForecastDuration.SIX_MONTHS);
  const [cropType, setCropType] = useState<CropType>(CropType.ANY);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CropRecommendation[]>([]);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [view, setView] = useState<'recommender' | 'history'>('recommender');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Ensure 'dark' is the default if no theme is saved or if the saved value is invalid
    setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark');
    setHistory(historyService.getHistory());
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const handleLocationChange = (value: string) => {
    // Only allow digits to be entered
    if (/^\d*$/.test(value)) {
        setLocation(value);
        if (locationError) {
            setLocationError(null);
        }
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate pincode before proceeding
    if (!/^\d{6}$/.test(location)) {
      setLocationError(UI_TEXT[language].invalidPincode);
      return;
    }
    setLocationError(null); // Clear error on successful validation

    if (!soilType || !landArea) return;

    // Pre-flight check for the API key to provide a clear error message in the UI.
    if (!process.env.API_KEY) {
      setError(UI_TEXT[language].apiKeyMissingError);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const area = parseFloat(landArea);
      const recommendations = await getAgroRecommendations(location, soilType, area, language, forecastDuration, cropType);
      setResults(recommendations);

      if (recommendations.length > 0) {
        // Automatically save to history
        const newEntry: HistoryEntry = {
            id: `rec_${new Date().toISOString()}`,
            name: `Recs - ${new Date().toLocaleString(language)}`,
            date: new Date().toISOString(),
            inputs: {
                location,
                soilType: soilType as SoilType,
                landArea: parseFloat(landArea),
                forecastDuration,
                cropType,
            },
            recommendations: recommendations,
        };
        const updatedHistory = historyService.addHistoryEntry(newEntry);
        setHistory(updatedHistory);
        
        // Fun confetti effect
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [location, soilType, landArea, language, forecastDuration, cropType]);

  const renderRecommenderView = () => (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-500 text-white rounded-xl shadow-2xl mb-12 py-16 px-8 text-center opacity-0 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
        <div className="absolute inset-0 bg-field-pattern bg-repeat-x bg-bottom opacity-50"></div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight relative z-10">
           {UI_TEXT[language].subtitle}
        </h1>
      </section>

      <section className="mb-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
        <InputForm
          location={location}
          setLocation={handleLocationChange}
          locationError={locationError}
          soilType={soilType}
          setSoilType={setSoilType}
          landArea={landArea}
          setLandArea={setLandArea}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          language={language}
          forecastDuration={forecastDuration}
          setForecastDuration={setForecastDuration}
          cropType={cropType}
          setCropType={setCropType}
        />
      </section>

      <section className="opacity-0 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
        <ResultsDisplay
          isLoading={isLoading}
          error={error}
          results={results}
          language={language}
        />
      </section>
    </>
  );

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden">
        {/* Background Effects */}
        <ParticleBackground theme={theme} />
        
        {/* Background Texture & Color */}
        <div className="absolute top-0 left-0 w-full h-full bg-brand-light dark:bg-brand-dark-secondary bg-[radial-gradient(theme(colors.gray.200)_0.5px,transparent_0.5px)] dark:bg-[radial-gradient(theme(colors.gray.700)_0.5px,transparent_0.5px)] [background-size:16px_16px] -z-40" />
        
        {/* Animated Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-30">
            <div 
                className="absolute -top-1/4 left-0 w-72 h-72 lg:w-96 lg:h-96 bg-emerald-200 dark:bg-emerald-900/50 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-40 animate-blob"
                style={{ animationDuration: '15s' }}
            ></div>
            <div 
                className="absolute top-1/4 -right-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-cyan-200 dark:bg-cyan-900/50 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-40 animate-blob"
                style={{ animationDelay: '3s', animationDuration: '20s' }}
            ></div>
            <div 
                className="absolute bottom-0 left-1/3 w-72 h-72 lg:w-96 lg:h-96 bg-green-200 dark:bg-green-900/50 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-40 animate-blob"
                style={{ animationDelay: '6s', animationDuration: '25s' }}
            ></div>
        </div>

        <LeftIllustration className="fixed top-1/3 -left-24 w-[30rem] h-auto text-gray-400/20 dark:text-gray-500/10 hidden xl:block -z-20" />
        <RightIllustration className="fixed top-1/3 -right-24 w-[30rem] h-auto text-gray-400/20 dark:text-gray-500/10 hidden xl:block -z-20" />

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={setLanguage}
        onSetView={setView}
      />
      <main className="container mx-auto px-4 py-8 pt-28 relative z-10">
        {view === 'history' ? (
          <HistoryView 
            history={history} 
            language={language}
          />
        ) : (
          renderRecommenderView()
        )}
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 relative z-10">
        <p>&copy; {new Date().getFullYear()} GrowFuse. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
