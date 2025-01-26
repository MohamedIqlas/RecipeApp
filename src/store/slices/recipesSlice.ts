import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Recipe, RecipeSearchResponse } from '../../types/recipe';

const API_ID = 'a5de3521';
const API_KEY = '28f8a20bd893e2740e68d4bbb349b977';

interface RecipesState {
  items: Recipe[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RecipesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ query, filters }: { query: string; filters?: string[] }) => {
    const response = await axios.get<RecipeSearchResponse>(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=50${
        filters ? `&health=${filters.join('&health=')}` : ''
      }`
    );
    return response.data.hits.map((hit) => hit.recipe);
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export default recipesSlice.reducer;