const ACTIVE_FORM_TEACHER = "ACTIVE-FORM-TEACHER"
const PASSIVE_FORM_TEACHER = "PASSIVE-FORM-TEACHER"
const CHANGE_INFO_TEACHER = "CHANGE-INFO-TEACHER"

let initialState = {
    teacher: {
        id: 1,
        name: 'Илья',
        surname: 'Соколов',
        secondName: 'Гекманович',
        age: 29,
        isMan: true
    },
    formActive: false
}

const teacherProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_FORM_TEACHER:
            return {
                ...state,
                formActive: true
            };
        case CHANGE_INFO_TEACHER: {
            return {
                ...state,
                teacher: {
                    ...state.teacher,
                    [action.item]: action.newValue
                }
            };
        };
        case PASSIVE_FORM_TEACHER:
            return {
                ...state,
                formActive: false
            };
        default:
            return state;
    }
}

export const changeInfoTeacherAC = (item, newValue) => ({ type: CHANGE_INFO_TEACHER, item, newValue })
export const passiveFormTeacherAC = () => ({ type: PASSIVE_FORM_TEACHER })
export const activeFormTeacherAC = () => ({ type: ACTIVE_FORM_TEACHER })
export default teacherProfileReducer;