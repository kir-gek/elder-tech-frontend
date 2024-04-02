import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

let store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;

export default store;