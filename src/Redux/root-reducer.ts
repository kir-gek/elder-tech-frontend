import { combineReducers } from "@reduxjs/toolkit";
import studentProfileReducer from "./student-profile-reducer";
import teacherProfileReducer from "./teacher-profile-reducer";
import teacherMyCoursesReducer from "./teacher-myCourses-reducer";


export const rootReducer = combineReducers({
    studentProfile: studentProfileReducer,
    teacherProfile: teacherProfileReducer,
    teacherMyCourses: teacherMyCoursesReducer
});
export type IRootState = ReturnType<typeof rootReducer>;