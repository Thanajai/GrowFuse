
import type { HistoryEntry } from '../types';

const HISTORY_KEY = 'growfuse_history';

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
    return [];
  }
};

/**
 * Adds a new entry to the recommendation history in localStorage.
 * @param newEntry The HistoryEntry object to add.
 * @returns The updated history array.
 */
export const addHistoryEntry = (newEntry: HistoryEntry): HistoryEntry[] => {
  try {
    const history = getHistory();
    const newHistory = [newEntry, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    return newHistory;
  } catch (e) {
    console.error("Failed to save history to localStorage", e);
    // On error, return the state before the failed add
    return getHistory();
  }
};
