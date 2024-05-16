import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "./root-reducer";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  currentID: number | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('authToken'),
  token: localStorage.getItem('authToken'),
  currentID: localStorage.getItem('currentID') ? Number(localStorage.getItem('currentID')) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string, id: number }>) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.currentID = action.payload.id;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('currentID', action.payload.id.toString());
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.currentID = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentID');
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state: IRootState) => state.auth.isLoggedIn;
export const selectAuthToken = (state: IRootState) => state.auth.token;
export const selectCurrentID = (state: IRootState) => state.auth.currentID;

export default authSlice.reducer;
