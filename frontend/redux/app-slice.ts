import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateRange } from "react-day-picker";

type TinitialState = {
  isLoading: boolean;
  date: DateRange | undefined;
};

const initialState: TinitialState = {
  isLoading: false,
  date: {
    from: new Date(2014, 0, 1),
    to: new Date(2014, 0, 31),
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDate: (state, action: PayloadAction<DateRange | undefined>) => {
      state.date = action.payload;
    },
    resetState: (state) => {
      state.isLoading = initialState.isLoading;
      state.date = initialState.date;
    },
  },
});

export default appSlice.reducer;
export const AppAction = appSlice.actions;
