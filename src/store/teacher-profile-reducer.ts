import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "types/User";
import { IRootState } from "./root-reducer";

interface TeacherProfileSliceState {
    teacher: UserModel,
}
interface ChangeInfoTeacherAction {
    item: string; newValue: string
}


const initialState: TeacherProfileSliceState = {
    teacher: {
        id: 1,
        name: 'Илья',
        surname: 'Соколов',
        secondName: 'Гекманович',
        age: 29,
        isMan: true
    }
}

const teacherProfileSlice = createSlice({
    name: 'teacherProfile',
    initialState,
    reducers: {
        changeInfoTeacher(state, action: PayloadAction<ChangeInfoTeacherAction>) {
            state.teacher = {
                ...state.teacher,
                [action.payload.item]: action.payload.newValue    // вот это наверн не оч тут spread оператор (...)
            }
        },

    }
}
)

export const getTeacher = (state: IRootState) => state.teacherProfile.teacher

export const { changeInfoTeacher } = teacherProfileSlice.actions

export default teacherProfileSlice.reducer



