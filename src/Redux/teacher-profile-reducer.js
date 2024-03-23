const ACTIVE_FORM = "ACTIVE-FORM"
const PASSIVE_FORM = "PASSIVE-FORM"
const CHANGE_INFO = "CHANGE-INFO"

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
        case ACTIVE_FORM:
            return {
                ...state,
                formActive: true
            };
        case CHANGE_INFO: {
            return {
                ...state,
                teacher: {
                    ...state.teacher,
                    [action.item]: action.newValue
                }
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

export const changeInfoAC = (item, newValue) => ({ type: CHANGE_INFO, item, newValue })
export const passiveFormAC = () => ({ type: PASSIVE_FORM })
export const activeFormAC = () => ({ type: ACTIVE_FORM })
export default teacherProfileReducer;