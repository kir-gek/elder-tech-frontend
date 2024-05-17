// teacherProfileMyCoursesSlice.ts

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRootState } from "./root-reducer";
import { CourseModel } from "types/Course";

export interface teacherProfileMyCoursesSliceState {
    courses: CourseModel[],
    formValueName: string,
    formValueDescription: string,
    formValueCategory: string, 
    formValueDifficulty: number, 
    formValueRating: number,
}

interface ChangeValueCourseFormAction {
    textName: string;
    textDescription: string;
    textCategory: string;
    difficulty: number;
    rating: number;
}

let initialState: teacherProfileMyCoursesSliceState = {
    courses: [],
    formValueName: 'введите название курса',
    formValueDescription: 'введите описание курса',
    formValueCategory: 'Языки', // Установим начальное значение для категории
    formValueDifficulty: 0, // Установим начальное значение для сложности
    formValueRating: 0, // Установим начальное значение для рейтинга
}

const teacherProfileMyCoursesSlice = createSlice({
    name: 'teacherMyCourses',
    initialState,
    reducers: {
        changeValueCourseForm(state, action: PayloadAction<ChangeValueCourseFormAction>) {
                state.formValueName = action.payload.textName;
                state.formValueDescription = action.payload.textDescription;
                state.formValueCategory = action.payload.textCategory;
                state.formValueDifficulty = action.payload.difficulty;
                state.formValueRating = action.payload.rating;
        },
        addNewCourse(state) {
            const newCourse: CourseModel = {
                id: state.courses.length + 1,
                title: state.formValueName,
                description: state.formValueDescription,
                category: state.formValueCategory,
                difficulty: state.formValueDifficulty,
                rating: state.formValueRating,
            };
            state.courses.push(newCourse);
            state.formValueName = 'введите название курса';
            state.formValueDescription = 'введите описание курса';
            state.formValueCategory = 'Языки';
            state.formValueDifficulty = 0;
            state.formValueRating = 0;
        }
    }
})

export const getFormValueName = (state: IRootState) => state.teacherMyCourses.formValueName
export const getCourses = (state: IRootState) => state.teacherMyCourses.courses
export const getFormValueDescription = (state: IRootState) => state.teacherMyCourses.formValueDescription
export const getFormValueCategory = (state: IRootState) => state.teacherMyCourses.formValueCategory // Селектор для категории
export const getFormValueDifficulty = (state: IRootState) => state.teacherMyCourses.formValueDifficulty
export const getFormValueRating = (state: IRootState) => state.teacherMyCourses.formValueRating

export default teacherProfileMyCoursesSlice.reducer
export const { changeValueCourseForm, addNewCourse } = teacherProfileMyCoursesSlice.actions
