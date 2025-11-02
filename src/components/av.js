import { createSlice } from "@reduxjs/toolkit";

export const av = createSlice({
  name: "av",
  initialState: [
    {
      img: "https://cdn.pixabay.com/photo/2022/02/20/02/29/projector-7023604_640.jpg",
      name: "Projectors",
      cost: 200,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2015/08/01/20/42/multimedia-870744_1280.jpg",
      name: "Speaker",
      cost: 35,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2020/06/25/17/57/microphone-5340340_640.jpg",
      name: "Microphones",
      cost: 45,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2023/12/04/14/58/table-8429665_640.jpg",
      name: "Whiteboards",
      cost: 80,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2016/11/18/21/30/open-sign-1836961_640.jpg",
      name: "Signage",
      cost: 80,
      quantity: 0,
    },
  ],

  reducers: {
    incrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item) {
        item.quantity++;
      }
    },
    decrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = av.actions;

export default av.reducer;