
import type { HistoryEntry, CropRecommendation } from '../types';

const HISTORY_KEY = 'growfuse_history';
const MAX_HISTORY_ENTRIES = 50; // Add a limit to history size

/**
 * Creates a fallback image URL from Unsplash based on the crop name.
 * @param englishCropName The English name of the crop.
 * @returns A URL string.
 */
const getUnsplashFallbackUrl = (englishCropName: string): string => {
  const sanitizedName = englishCropName
    .replace(/ *\([^)]*\) */g, "") // Remove anything in parentheses
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase();
  return `https://source.unsplash.com/800x600/?${sanitizedName}-crop,farm-field`;
};


/**
 * Retrieves the recommendation history from localStorage.
 * @returns An array of HistoryEntry objects.
 */
export const getHistory = (): HistoryEntry[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (e) {
    console.error("Failed to parse history from localStorage", e);
    // If parsing fails, it's safer to clear the corrupted data.
    localStorage.removeItem(HISTORY_KEY);
    return [];
  }
};

/**
 * Adds a new entry to the recommendation history in localStorage.
 * It processes the entry to reduce its size before storing.
 * @param newEntry The HistoryEntry object to add, potentially with large base64 images.
 * @returns The updated history array, with image URLs optimized for storage.
 */
export const addHistoryEntry = (newEntry: HistoryEntry): HistoryEntry[] => {
  try {
    // Deep clone the entry to avoid mutating the object in React state.
    const storableEntry: HistoryEntry = JSON.parse(JSON.stringify(newEntry));

    // Replace large base64 image URLs with smaller, persistent Unsplash URLs.
    storableEntry.recommendations = storableEntry.recommendations.map((rec: CropRecommendation) => {
      // Check if the URL is a base64 string.
      if (rec.imageUrl && rec.imageUrl.startsWith('data:image/')) {
        return {
          ...rec,
          imageUrl: getUnsplashFallbackUrl(rec.englishCropName),
        };
      }
      return rec; // Keep existing non-base64 URLs (e.g., if it was already a fallback)
    });

    const history = getHistory();
    let newHistory = [storableEntry, ...history];

    // Enforce a limit on the number of history entries.
    if (newHistory.length > MAX_HISTORY_ENTRIES) {
      newHistory = newHistory.slice(0, MAX_HISTORY_ENTRIES);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    return newHistory;
  } catch (e) {
    console.error("Failed to save history to localStorage", e);
    // On quota error, we could try to prune the history, but for now, just log it.
    // The function will return the old history.
    return getHistory();
  }
};
