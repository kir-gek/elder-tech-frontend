const ACTIVE_FORM_STUDENT = "ACTIVE-FORM-STUDENT"
const PASSIVE_FORM_STUDENT = "PASSIVE-FORM-STUDENT"
const CHANGE_INFO_STUDENT = "CHANGE-INFO-STUDENT"

let initialState = {
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
    }
    ],
    formActive: false
}

const studentProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_FORM_STUDENT:
            return {
                ...state,
                formActive: true
            };
        case CHANGE_INFO_STUDENT: {
            return {
                ...state,
                students: state.students.map(student =>
                    student.id === action.studentId
                        ? { ...student, [action.item]: action.newValue }
                        : student
                )
            };
        };
        case PASSIVE_FORM_STUDENT:
            return {
                ...state,
                formActive: false
            };
        default:
            return state;
    }
}

export const changeInfoStudentAC = (studentId, item, newValue) => ({ type: CHANGE_INFO_STUDENT, studentId, item, newValue })
export const passiveFormStudentAC = () => ({ type: PASSIVE_FORM_STUDENT })
export const activeFormStudentAC = () => ({ type: ACTIVE_FORM_STUDENT })
export default studentProfileReducer;