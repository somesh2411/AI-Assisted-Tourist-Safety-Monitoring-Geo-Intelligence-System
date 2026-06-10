import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './contexts/LanguageContext';
import { HistoryProvider } from './contexts/HistoryContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Results from './pages/Results';
import Nutrition from './pages/Nutrition';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import History from './pages/History';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <HistoryProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/scan" element={<Scan />} />
                <Route path="/results/:scanId" element={<Results />} />
                <Route path="/nutrition/:itemName" element={<Nutrition />} />
                <Route path="/recipes/:itemName" element={<Recipes />} />
                <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '14px',
                },
                success: {
                  style: {
                    background: '#10B981',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                  },
                },
              }}
            />
          </div>
        </Router>
      </HistoryProvider>
    </LanguageProvider>
  );
}

export default App;