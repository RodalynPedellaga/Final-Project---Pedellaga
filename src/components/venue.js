import { createSlice } from "@reduxjs/toolkit";

export const Venue = createSlice({
  name: "venue",
  initialState: [
    { img: "https://cdn.pixabay.com/photo/2017/03/28/12/16/chairs-2181980_1280.jpg", name: "Conference Room (Capacity:15)", cost: 3500, quantity: 0 },
    { img: "https://cdn.pixabay.com/photo/2013/02/26/01/10/auditorium-86197_1280.jpg", name: "Auditorium Hall (Capacity:200)", cost: 5500, quantity: 0 },
    { img: "https://cdn.pixabay.com/photo/2017/08/23/16/05/iocenters-2673327_640.jpg", name: "Presentation Room (Capacity:50)", cost: 700, quantity: 0 },
    { img: "https://cdn.pixabay.com/photo/2016/02/03/16/56/meeting-1177454_640.jpg", name: "Large Meeting Room (Capacity:10)", cost: 900, quantity: 0 },
    { img: "https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_640.jpg", name: "Small Meeting Room (Capacity:5)", cost: 1100, quantity: 0 },
  ],
  reducers: {
    incrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        if (
          state[index].name === "Auditorium Hall (Capacity:200)" &&
          state[index].quantity >= 200
        ) {
          return;
        }
        state[index].quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = Venue.actions;

export default Venue.reducer;