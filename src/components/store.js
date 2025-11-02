import { configureStore } from "@reduxjs/toolkit";
import venueReducer from "./venue";
import avReducer from "./av";
import mealsReducer from "./meal";

export default configureStore({
  reducer: {
    venue: venueReducer,
    av: avReducer,
    meals: mealsReducer,
  },
});