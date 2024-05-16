import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "./root-reducer";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state: IRootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
