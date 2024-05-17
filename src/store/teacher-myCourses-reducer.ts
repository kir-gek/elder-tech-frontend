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
    courses: [ {
        id: 1,
        title: 'Основы английского языка',
        description: 'Научитесь базовым правилам грамматики, лексики и произношения английского языка',
        category: 'Языки',
        difficulty: 1,
        rating: 5
      },
      {
        id: 2,
        title: 'Введение в когнитивную психологию',
        description: 'Изучите основные концепции и теории когнитивной психологии, такие как восприятие, память и мышление.',
        category: 'Психология',
        difficulty: 2,
        rating: 4
      },
      {
        id: 3,
        title: 'Кулинария для начинающих',
        description: 'Научитесь готовить простые и вкусные блюда, осваивая базовые техники приготовления пищи.',
        category: 'Готовка',
        difficulty: 2,
        rating: 4
      }],
    formValueName: 'введите название курса',
    formValueDescription: 'введите описание курса',
    formValueCategory: 'Языки',
    formValueDifficulty: 0,
    formValueRating: 0,
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
        },
        deleteCourse(state, action: PayloadAction<number>) {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        }
    }
})

export const getFormValueName = (state: IRootState) => state.teacherMyCourses.formValueName
export const getCourses = (state: IRootState) => state.teacherMyCourses.courses
export const getFormValueDescription = (state: IRootState) => state.teacherMyCourses.formValueDescription
export const getFormValueCategory = (state: IRootState) => state.teacherMyCourses.formValueCategory
export const getFormValueDifficulty = (state: IRootState) => state.teacherMyCourses.formValueDifficulty
export const getFormValueRating = (state: IRootState) => state.teacherMyCourses.formValueRating

export default teacherProfileMyCoursesSlice.reducer
export const { changeValueCourseForm, addNewCourse, deleteCourse } = teacherProfileMyCoursesSlice.actions
