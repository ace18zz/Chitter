import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  peeps: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPeeps: (state, action) => {
      state.peeps = action.payload.peeps;
    },
    setPeep: (state, action) => {
      const updatedPeeps = state.peeps.map((peep) => {
        if (peep._id === action.payload.peep._id) return action.payload.peep;
        return peep;
      });
      state.peeps = updatedPeeps;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPeeps, setPeep } =
  authSlice.actions;
export default authSlice.reducer;