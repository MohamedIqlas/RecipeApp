import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import type { Recipe } from './types/recipe';

function RecipeApp() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { items: recipes, status } = useSelector((state: RootState) => state.recipes);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Finder</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Favorite Recipes</h2>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map((recipe) => (
                    <RecipeCard
                      key={recipe.uri}
                      recipe={recipe}
                      onSelect={() => setSelectedRecipe(recipe)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No favorite recipes yet</p>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-4">All Recipes</h2>
            {status === 'loading' && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            )}
            
            {status === 'succeeded' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.uri}
                    recipe={recipe}
                    onSelect={() => setSelectedRecipe(recipe)}
                  />
                ))}
              </div>
            )}

            {status === 'failed' && (
              <p className="text-red-500 text-center">Failed to load recipes</p>
            )}
          </div>
        </div>
      </main>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <RecipeApp />
    </Provider>
  );
}