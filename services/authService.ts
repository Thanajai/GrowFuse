
import type { User } from '../types';

const DB_KEY = 'agro_ai_users_db';
const CURRENT_USER_PHONE_KEY = 'agro_ai_current_user_phone';

const getDb = (): Record<string, User> => {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
  } catch (e) {
    console.error("Failed to parse user database from localStorage", e);
    return {};
  }
};

const saveDb = (db: Record<string, User>): void => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error("Failed to save user database to localStorage", e);
  }
};

/**
 * Ensures a user object retrieved from storage is in the correct format,
 * preventing crashes from malformed or outdated data.
 * @param data The raw data from localStorage.
 * @returns A valid User object or null if the data is unusable.
 */
const sanitizeUser = (data: any): User | null => {
    if (!data || typeof data !== 'object' || !data.phone) {
        return null;
    }

    return {
        id: typeof data.id === 'string' ? data.id : `user_${new Date().getTime()}`,
        name: typeof data.name === 'string' ? data.name : `+91 ${data.phone}`,
        phone: typeof data.phone === 'string' ? data.phone : '',
        farms: Array.isArray(data.farms) ? data.farms : [],
        savedRecommendations: Array.isArray(data.savedRecommendations) ? data.savedRecommendations : [],
    };
};


// Login function that finds or creates a user
export const loginWithPhone = (phone: string): User => {
  const db = getDb();
  let user = db[phone];

  if (!user) {
    // Create a new user if one doesn't exist for this phone number
    user = {
      id: `user_${new Date().getTime()}`,
      name: `+91 ${phone}`, // Set name to the phone number for identification
      phone: phone,
      farms: [],
      savedRecommendations: [],
    };
    db[phone] = user;
    saveDb(db);
  }
  
  // Set the current user session
  localStorage.setItem(CURRENT_USER_PHONE_KEY, phone);
  // Return a sanitized version in case the stored one was malformed
  return sanitizeUser(user) as User;
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_PHONE_KEY);
};

// Get current user from localStorage
export const getUser = (): User | null => {
  const phone = localStorage.getItem(CURRENT_USER_PHONE_KEY);
  if (!phone) {
    return null;
  }
  const db = getDb();
  const userFromDb = db[phone] || null;
  
  if (!userFromDb) {
      return null;
  }
  
  const sanitizedUser = sanitizeUser(userFromDb);

  // If sanitization was necessary, update the stored data to prevent future issues
  if (sanitizedUser && JSON.stringify(sanitizedUser) !== JSON.stringify(userFromDb)) {
    saveUser(sanitizedUser);
  }

  return sanitizedUser;
};

// Save user data to localStorage
export const saveUser = (user: User): void => {
  if (!user || !user.phone) {
      console.error("Cannot save user without a phone number.");
      return;
  }
  const db = getDb();
  db[user.phone] = user;
  saveDb(db);
};
