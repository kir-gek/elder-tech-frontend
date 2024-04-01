import { PayloadAction, createDraftSafeSelector, createSelector, createSlice } from "@reduxjs/toolkit";
import { CourseModel } from "../types/Course"
import { IRootState, selectSelf } from "./root-reducer";
import { useSelector } from "react-redux";

export interface teacherProfileMyCoursesSliceState {
    courses: CourseModel[],
    formValueName: string,
    formValueDescription: string
}

interface ChangeValueCourseFormAction {
    textName: string; textDescription: string
}

let initialState: teacherProfileMyCoursesSliceState = {
    courses: [{
        id: 1,
        title: 'Введение в компьютерную грамотность',
        description: 'описание курса введение в компьютерную грамотность'
    }],
    formValueName: 'введите название курса',
    formValueDescription: 'введите описание курса'
}

const teacherProfileMyCoursesSlice = createSlice({
    name: 'teacherMyCourses',
    initialState,
    reducers: {
        changeValueCourseForm(state, action: PayloadAction<ChangeValueCourseFormAction>) {
            state.formValueName = action.payload.textName;
            state.formValueDescription = action.payload.textDescription
        },
        addNewCourse(state) {  //если экшен без пейлоада, если в нем только свойство Type
            state.courses.push({ id: 5, title: state.formValueName, description: state.formValueDescription });
            state.formValueName = 'введите название курса';
            state.formValueDescription = 'введите описание курса'
        }
    }
})

// const findCourseByTitle = (title:string) => createSelector(
//     (state: IRootState) => state.teacherMyCourses.courses,
//     (courses) => courses.find((course: CourseModel) => course.title === title))    

export const getFormValueName = (state:IRootState) => state.teacherMyCourses.formValueName
export const getCourses = (state:IRootState) => state.teacherMyCourses.courses
export const getFormValueDescription = (state:IRootState) => state.teacherMyCourses.formValueDescription




export default teacherProfileMyCoursesSlice.reducer

export const { changeValueCourseForm, addNewCourse } = teacherProfileMyCoursesSlice.actions