import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Recipe } from '../../types/recipe';

interface FavoritesState {
  items: Recipe[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Recipe>) => {
      if (!state.items.find((recipe) => recipe.uri === action.payload.uri)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((recipe) => recipe.uri !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;