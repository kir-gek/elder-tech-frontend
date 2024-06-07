import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRootState } from "./root-reducer";
import axiosInstance from 'api/axiosConfig'; // Путь к вашему axiosInstance
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

const initialState: teacherProfileMyCoursesSliceState = {
    courses: [], // Инициализируем как пустой массив
    formValueName: 'введите название курса',
    formValueDescription: 'введите описание курса',
    formValueCategory: 'Языки',
    formValueDifficulty: 0,
    formValueRating: 0,
};

// Асинхронное действие для загрузки курсов
export const fetchUserCourses = createAsyncThunk(
    'teacherMyCourses/fetchUserCourses',
    async (_, thunkAPI) => {
        const userId = localStorage.getItem('currentID');
        if (!userId) {
            throw new Error('currentID не найден в localStorage');
        }

        const response = await axiosInstance.get(`/courses/user/${userId}`);
        console.log('Fetched user courses:', response.data);
        return response.data;
    }
);

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
        deleteCourse(state, action: PayloadAction<number>) {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCourses.fulfilled, (state, action) => {
            state.courses = action.payload;
        });
        builder.addCase(fetchUserCourses.rejected, (state, action) => {
            console.error('Ошибка при загрузке курсов пользователя:', action.error);
        });
    }
});

export const getFormValueName = (state: IRootState) => state.teacherMyCourses.formValueName;
export const getCourses = (state: IRootState) => state.teacherMyCourses.courses || [];
export const getFormValueDescription = (state: IRootState) => state.teacherMyCourses.formValueDescription;
export const getFormValueCategory = (state: IRootState) => state.teacherMyCourses.formValueCategory;
export const getFormValueDifficulty = (state: IRootState) => state.teacherMyCourses.formValueDifficulty;
export const getFormValueRating = (state: IRootState) => state.teacherMyCourses.formValueRating;

export default teacherProfileMyCoursesSlice.reducer;
export const { changeValueCourseForm, deleteCourse } = teacherProfileMyCoursesSlice.actions;
