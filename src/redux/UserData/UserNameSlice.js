import { createSlice } from "@reduxjs/toolkit";

export const UserNameSlice = createSlice({
  name: "Data",
  initialState: {
    username: "",
  },
  reducers: {
    SetUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetUsername  } = UserNameSlice.actions;

export default UserNameSlice.reducer;
