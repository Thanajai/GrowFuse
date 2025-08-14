
export enum SoilType {
  ALLUVIAL = 'Alluvial',
  BLACK = 'Black',
  RED = 'Red',
  LATERITE = 'Laterite',
  ARID = 'Arid',
  FOREST = 'Forest',
}

export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
  TAMIL = 'ta',
  TELUGU = 'te',
  KANNADA = 'kn',
  BENGALI = 'bn',
  MARATHI = 'mr',
  PUNJABI = 'pa',
}

export enum ForecastDuration {
  SIX_MONTHS = '6',
  TWELVE_MONTHS = '12',
}

export interface CropRecommendation {
  cropName: string;
  englishCropName: string;
  confidenceScore: number;
  justification: string;
  imageUrl: string;
}

export interface HistoryEntry {
  id: string;
  name: string;
  date: string; // ISO date string
  inputs: {
    location: string;
    soilType: SoilType;
    landArea: number;
    forecastDuration: ForecastDuration;
  };
  recommendations: CropRecommendation[];
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  soilType: SoilType;
  landArea: number;
}

export interface SavedRecommendation extends HistoryEntry {
  farmId: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  farms: Farm[];
  savedRecommendations: SavedRecommendation[];
}
