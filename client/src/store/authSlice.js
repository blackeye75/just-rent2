import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: localStorage.getItem("authStatus") === "true",
  userData: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload);
      localStorage.setItem("authStatus", "true");
      localStorage.setItem("actionPayload",JSON.stringify(action.payload))
      // console.log(action.payload);
    },
    logout: (state) => {
      (state.status = false),
        state.userData = null,
        localStorage.removeItem("authStatus");
        localStorage.removeItem("actionPayload")
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
