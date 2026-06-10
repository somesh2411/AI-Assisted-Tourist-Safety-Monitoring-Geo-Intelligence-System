import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ScanResult {
  id: string;
  predicted_class: string;
  confidence: number;
  timestamp: string;
  image?: string; // base64 image data
  all_predictions: Record<string, number>;
}

export interface SavedRecipe {
  id: string;
  name: string;
  description: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  calories_per_serving: number;
  image: string;
  saved_at: string;
  item_name: string;
}

interface HistoryContextType {
  scanHistory: ScanResult[];
  favoriteRecipes: SavedRecipe[];
  addScanResult: (result: ScanResult) => void;
  addFavoriteRecipe: (recipe: SavedRecipe) => void;
  removeFavoriteRecipe: (recipeId: string) => void;
  clearScanHistory: () => void;
  getScanResult: (scanId: string) => ScanResult | undefined;
  isRecipeFavorited: (recipeId: string) => boolean;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

interface HistoryProviderProps {
  children: ReactNode;
}

const SCAN_HISTORY_KEY = 'freshscan_history';
const FAVORITE_RECIPES_KEY = 'freshscan_favorite_recipes';

export function HistoryProvider({ children }: HistoryProviderProps) {
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<SavedRecipe[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(SCAN_HISTORY_KEY);
      if (savedHistory) {
        setScanHistory(JSON.parse(savedHistory));
      }

      const savedRecipes = localStorage.getItem(FAVORITE_RECIPES_KEY);
      if (savedRecipes) {
        setFavoriteRecipes(JSON.parse(savedRecipes));
      }
    } catch (error) {
      console.error('Error loading history from localStorage:', error);
    }
  }, []);

  // Save scan history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(scanHistory));
    } catch (error) {
      console.error('Error saving scan history to localStorage:', error);
    }
  }, [scanHistory]);

  // Save favorite recipes to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(favoriteRecipes));
    } catch (error) {
      console.error('Error saving favorite recipes to localStorage:', error);
    }
  }, [favoriteRecipes]);

  const addScanResult = (result: ScanResult) => {
    setScanHistory(prev => {
      // Remove any existing result with the same ID
      const filtered = prev.filter(item => item.id !== result.id);
      // Add new result at the beginning and limit to 50 items
      return [result, ...filtered].slice(0, 50);
    });
  };

  const addFavoriteRecipe = (recipe: SavedRecipe) => {
    setFavoriteRecipes(prev => {
      // Check if recipe is already favorited
      if (prev.some(item => item.id === recipe.id)) {
        return prev;
      }
      // Add new recipe at the beginning
      return [recipe, ...prev];
    });
  };

  const removeFavoriteRecipe = (recipeId: string) => {
    setFavoriteRecipes(prev => prev.filter(item => item.id !== recipeId));
  };

  const clearScanHistory = () => {
    setScanHistory([]);
  };

  const getScanResult = (scanId: string): ScanResult | undefined => {
    return scanHistory.find(result => result.id === scanId);
  };

  const isRecipeFavorited = (recipeId: string): boolean => {
    return favoriteRecipes.some(recipe => recipe.id === recipeId);
  };

  const value: HistoryContextType = {
    scanHistory,
    favoriteRecipes,
    addScanResult,
    addFavoriteRecipe,
    removeFavoriteRecipe,
    clearScanHistory,
    getScanResult,
    isRecipeFavorited
  };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory(): HistoryContextType {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}