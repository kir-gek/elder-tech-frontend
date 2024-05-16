import { combineReducers } from "@reduxjs/toolkit";
import studentProfile from "./student-profile-reducer";
import teacherProfile from "./teacher-profile-reducer";
import teacherMyCourses from "./teacher-myCourses-reducer";
import auth from "./authSlice";
import user from "./userSlice"


export const rootReducer = combineReducers({
    studentProfile,
    teacherProfile,
    teacherMyCourses,
    auth,
    user
});

export const selectSelf = (state: IRootState) => state;
export type IRootState = ReturnType<typeof rootReducer>;