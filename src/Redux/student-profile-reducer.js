const ACTIVE_FORM = "ACTIVE-FORM"
const PASSIVE_FORM = "PASSIVE-FORM"
const CHANGE_INFO = "CHANGE-INFO"

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
        case ACTIVE_FORM:
            return {
                ...state,
                formActive: true
            };
        case CHANGE_INFO: {
            return {
                ...state,
                students: state.students.map(student =>
                    student.id === action.studentId
                        ? { ...student, [action.item]: action.newValue }
                        : student
                )
            };
        };
        case PASSIVE_FORM:
            return {
                ...state,
                formActive: false
            };
        default:
            return state;
    }
}

export const changeInfoAC = (studentId, item, newValue) => ({ type: CHANGE_INFO, studentId, item, newValue })
export const passiveFormAC = () => ({ type: PASSIVE_FORM })
export const activeFormAC = () => ({ type: ACTIVE_FORM })
export default studentProfileReducer;