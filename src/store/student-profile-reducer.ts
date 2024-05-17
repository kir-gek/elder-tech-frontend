import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IRootState } from "./root-reducer";
import { UserModel } from "types/User";

interface StudentProfileSliceState {
    students: UserModel[],
}

interface ChangeInfoStudentAction {
    studentId: number;
    item: string;
    newValue: string;
}

interface AddStudentAction {
    name: string;
    surname: string;
    secondName: string;
    age: number;
    isMan: boolean;
}

const initialState: StudentProfileSliceState = {
    students: [{
        id: 1,
        name: 'Кирилл',
        surname: 'Кириллов',
        secondName: 'Кириллович',
        age: 99,
        isMan: true
    }, {
        id: 2,
        name: 'Дмитрий',
        surname: 'Дмитров',
        secondName: 'Дмитриевич',
        age: 98,
        isMan: true
    }, {
        id: 3,
        name: 'Илья',
        surname: 'Ильев',
        secondName: 'Ильич',
        age: 97,
        isMan: true
    }, {
        id: 4,
        name: 'Тимур',
        surname: 'Тимуров',
        secondName: 'Тимрович',
        age: 96,
        isMan: true
    }]
}

const studentProfileSlice = createSlice({
    name: "studentProfile",
    initialState,
    reducers: {
        changeInfoStudent(state, action: PayloadAction<ChangeInfoStudentAction>) {
            state.students = state.students.map(student =>
                student.id === action.payload.studentId
                    ? { ...student, [action.payload.item]: action.payload.newValue }
                    : student
            );
        },
        deleteStudent(state, action: PayloadAction<number>) {
            state.students = state.students.filter(student => student.id !== action.payload);
        },
        addStudent(state, action: PayloadAction<AddStudentAction>) {
            const newStudent: UserModel = {
                id: state.students.length + 1,
                ...action.payload,
            };
            state.students.push(newStudent);
        }
    },
})

export const selectStudentById = (id: number) =>
    createSelector(
        (state: IRootState) => state.studentProfile.students,
        (students) => students && students.find((student: UserModel) => student.id === id)
    );

export const getStudents = (state: IRootState) => state.studentProfile.students;

export const { changeInfoStudent, deleteStudent, addStudent } = studentProfileSlice.actions;

export default studentProfileSlice.reducer;
