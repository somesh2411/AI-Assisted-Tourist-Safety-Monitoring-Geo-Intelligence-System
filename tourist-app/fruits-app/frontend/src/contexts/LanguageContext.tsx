import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

type Language = 'en' | 'hi' | 'ta' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languages = {
  en: 'English',
  hi: 'हिन्दी',
  ta: 'தமிழ்',
  te: 'తెలుగు'
};

const API_BASE_URL = 'http://localhost:5000';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_language') as Language;
    if (savedLang && Object.keys(languages).includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (Object.keys(languages).includes(browserLang)) {
        setLanguage(browserLang as Language);
      }
    }
  }, []);

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'en') {
        // Default English translations
        setTranslations({
          home: 'Home',
          scan: 'Scan',
          nutrition: 'Nutrition',
          recipes: 'Recipes',
          history: 'History',
          settings: 'Settings',
          welcome_title: 'Welcome to FreshScan',
          welcome_subtitle: 'AI-powered fruit and vegetable identification with nutrition insights',
          scan_now: 'Scan Now',
          explore_nutrition: 'Explore Nutrition',
          browse_recipes: 'Browse Recipes',
          scan_title: 'Identify Your Produce',
          upload_image: 'Upload Image',
          take_photo: 'Take Photo',
          drag_drop: 'Drag and drop an image here',
          analyzing: 'Analyzing...',
          confidence: 'Confidence',
          scan_another: 'Scan Another',
          identified_as: 'Identified as',
          view_nutrition: 'View Nutrition',
          view_recipes: 'View Recipes',
          save_result: 'Save Result',
          calories_per_100g: 'Calories per 100g',
          macronutrients: 'Macronutrients',
          vitamins: 'Vitamins',
          minerals: 'Minerals',
          health_benefits: 'Health Benefits',
          carbohydrates: 'Carbohydrates',
          protein: 'Protein',
          fat: 'Fat',
          fiber: 'Fiber',
          sugar: 'Sugar',
          water: 'Water',
          recipe_suggestions: 'Recipe Suggestions',
          prep_time: 'Prep Time',
          cook_time: 'Cook Time',
          servings: 'Servings',
          difficulty: 'Difficulty',
          ingredients: 'Ingredients',
          instructions: 'Instructions',
          view_recipe: 'View Recipe',
          save_recipe: 'Save Recipe',
          minutes: 'minutes',
          scan_history: 'Scan History',
          favorite_recipes: 'Favorite Recipes',
          clear_history: 'Clear History',
          no_history: 'No scan history yet',
          scanned_on: 'Scanned on',
          language: 'Language',
          notifications: 'Notifications',
          privacy: 'Privacy',
          about: 'About',
          version: 'Version'
        });
        return;
      }

      setIsLoading(true);
      try {
        const keys = [
          'home', 'scan', 'nutrition', 'recipes', 'history', 'settings',
          'welcome_title', 'welcome_subtitle', 'scan_now', 'explore_nutrition', 'browse_recipes',
          'scan_title', 'upload_image', 'take_photo', 'drag_drop', 'analyzing', 'confidence', 'scan_another',
          'identified_as', 'view_nutrition', 'view_recipes', 'save_result',
          'calories_per_100g', 'macronutrients', 'vitamins', 'minerals', 'health_benefits',
          'carbohydrates', 'protein', 'fat', 'fiber', 'sugar', 'water',
          'recipe_suggestions', 'prep_time', 'cook_time', 'servings', 'difficulty',
          'ingredients', 'instructions', 'view_recipe', 'save_recipe', 'minutes',
          'scan_history', 'favorite_recipes', 'clear_history', 'no_history', 'scanned_on',
          'language', 'notifications', 'privacy', 'about', 'version'
        ];

        const response = await axios.post(`${API_BASE_URL}/translate`, {
          lang: language,
          keys: keys
        });

        setTranslations(response.data);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        setLanguage('en');
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  // Save language preference
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred_language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleLanguageChange,
    t,
    isLoading,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { languages };
export type { Language };