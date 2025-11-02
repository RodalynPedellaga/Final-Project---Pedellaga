import { createSlice } from "@reduxjs/toolkit";

export const mealsSlice = createSlice({
  name: "meals",
  initialState: [
    { name: "Breakfast", cost: 50, selected: false, image: "https://cdn.pixabay.com/photo/2016/11/06/23/16/breakfast-1804436_960_720.jpg" },
    { name: "High Tea", cost: 25, selected: false, image: "https://cdn.pixabay.com/photo/2015/05/25/14/29/tea-783352_640.jpg" },
    { name: "Lunch", cost: 65, selected: false, image: "https://cdn.pixabay.com/photo/2017/03/27/13/54/bread-2178874_640.jpg" },
    { name: "Dinner", cost: 70, selected: false, image: "https://cdn.pixabay.com/photo/2015/11/19/10/38/food-1050813_640.jpg" },
  ],
  reducers: {
    toggleMealSelection: (state, action) => {
      state[action.payload].selected = !state[action.payload].selected;
    },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;

export default mealsSlice.reducer;