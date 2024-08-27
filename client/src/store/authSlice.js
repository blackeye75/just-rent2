import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: localStorage.getItem("authStatus") === "true",
  userData: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload);
      localStorage.setItem("authStatus", "true");
      localStorage.setItem("actionPayload", JSON.stringify(action.payload));
      // console.log(action.payload);
    },
    logout: (state) => {
      (state.status = false),
        (state.userData = null),
        localStorage.removeItem("authStatus");
      localStorage.removeItem("actionPayload");
    },
    refreshToken: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, refreshToken } = authSlice.actions;

export const refreshTokenIfNeeded = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/users/refresh-token",
      {},
      { withCredentials: true }
    );
    dispatch(refreshToken(data.accessToken));
  } catch (error) {
    console.error("Failed to refresh token", error);
    dispatch(logout());
  }
};
export default authSlice.reducer;
