import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipesSlice';
import favoritesReducer from './slices/favoritesSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;