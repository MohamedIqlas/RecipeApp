import React from 'react';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import type { Recipe } from '../types/recipe';
import type { RootState } from '../store/store';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((fav) => fav.uri === recipe.uri);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(recipe.uri));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
    >
      <img
        src={recipe.image}
        alt={recipe.label}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold mb-2">{recipe.label}</h3>
          <button
            onClick={toggleFavorite}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {recipe.dietLabels.join(', ')}
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{Math.round(recipe.calories)} cal</span>
          <span>{recipe.totalTime} min</span>
        </div>
      </div>
    </div>
  );
}