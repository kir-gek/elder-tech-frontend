import { combineReducers } from "@reduxjs/toolkit";
import teacherMyCourses from "./teacher-myCourses-reducer";
import auth from "./authSlice";
import user from "./userSlice"


export const rootReducer = combineReducers({    
    teacherMyCourses,
    auth,
    user
});

export const selectSelf = (state: IRootState) => state;
export type IRootState = ReturnType<typeof rootReducer>;