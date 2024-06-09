import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRootState } from "./root-reducer";
import axiosInstance from 'api/axiosConfig'; // Путь к вашему axiosInstance
import { CourseModel } from "types/Course";

export interface myCoursesSliceState {
    courses: CourseModel[]}

const initialState: myCoursesSliceState = {
    courses: [], // Инициализируем как пустой массив    
};

// Асинхронное действие для загрузки курсов
export const fetchUserCourses = createAsyncThunk(
    'myCourses/fetchUserCourses',
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

const myCoursesSlice = createSlice({
    name: 'myCourses',
    initialState,
    reducers: {        
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

export const getCourses = (state: IRootState) => state.myCourses.courses || [];

export default myCoursesSlice.reducer;
export const { deleteCourse } = myCoursesSlice.actions;
