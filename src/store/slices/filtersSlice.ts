import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  dietary: string[];
  mealType: string[];
  searchQuery: string;
}

const initialState: FiltersState = {
  dietary: [],
  mealType: [],
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDietaryFilters: (state, action: PayloadAction<string[]>) => {
      state.dietary = action.payload;
    },
    setMealTypeFilters: (state, action: PayloadAction<string[]>) => {
      state.mealType = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setDietaryFilters, setMealTypeFilters, setSearchQuery } = filtersSlice.actions;
export default filtersSlice.reducer;