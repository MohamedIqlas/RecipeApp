import { useDispatch, useSelector } from 'react-redux';
import { setDietaryFilters, setMealTypeFilters } from '../store/slices/filtersSlice';
import { fetchRecipes } from '../store/slices/recipesSlice';
import type { RootState, AppDispatch } from '../store/store';
import { useEffect } from 'react';

const dietaryOptions = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
];

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

export default function Filters() {
  const dispatch = useDispatch<AppDispatch>();
  const { dietary, mealType, searchQuery } = useSelector(
    (state: RootState) => state.filters
  );

  useEffect(() => {
    // Automatically select 'vegetarian' when the page loads
    if (!dietary.includes('vegetarian')) {
      dispatch(setDietaryFilters([...dietary, 'vegetarian']));
      dispatch(fetchRecipes({ query: searchQuery, filters: [...dietary, 'vegetarian'] }));
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  const handleDietaryChange = (filter: string) => {
    const newFilters = dietary.includes(filter)
      ? dietary.filter((f) => f !== filter)
      : [...dietary, filter];
    dispatch(setDietaryFilters(newFilters));
    dispatch(fetchRecipes({ query: searchQuery, filters: newFilters }));
  };

  const handleMealTypeChange = (type: string) => {
    const newTypes = mealType.includes(type)
      ? mealType.filter((t) => t !== type)
      : [...mealType, type];
    dispatch(setMealTypeFilters(newTypes));
    dispatch(fetchRecipes({ query: searchQuery, filters: [...dietary, ...newTypes] }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Dietary Restrictions</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleDietaryChange(option)}
              className={`px-3 py-1 rounded-full text-sm ${
                dietary.includes(option)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Meal Type</h3>
        <div className="flex flex-wrap gap-2">
          {mealTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleMealTypeChange(type)}
              className={`px-3 py-1 rounded-full text-sm ${
                mealType.includes(type)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
