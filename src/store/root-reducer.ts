import { combineReducers } from "@reduxjs/toolkit";
import myCourses from "./myCourses-reducer";
import auth from "./authSlice";
import user from "./userSlice"


export const rootReducer = combineReducers({    
    myCourses,
    auth,
    user
});

export const selectSelf = (state: IRootState) => state;
export type IRootState = ReturnType<typeof rootReducer>;