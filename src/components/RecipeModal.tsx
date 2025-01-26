import React from 'react';
import { X, Clock, Users } from 'lucide-react';
import type { Recipe } from '../types/recipe';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{recipe.label}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 space-y-6">
          <img
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-64 object-cover rounded-lg"
          />
          
          <div className="flex gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              <span>{recipe.totalTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5" />
              <span>{recipe.yield} servings</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Details</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Calories:</span>{' '}
                {Math.round(recipe.calories)}
              </p>
              <p>
                <span className="font-medium">Diet Labels:</span>{' '}
                {recipe.dietLabels.join(', ') || 'None'}
              </p>
              <p>
                <span className="font-medium">Health Labels:</span>{' '}
                {recipe.healthLabels.join(', ')}
              </p>
              <p>
                <span className="font-medium">Cuisine Type:</span>{' '}
                {recipe.cuisineType.join(', ')}
              </p>
            </div>
          </div>

          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Full Recipe
          </a>
        </div>
      </div>
    </div>
  );
}