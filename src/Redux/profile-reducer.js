const ACTIVE_FORM = "ACTIVE-FORM"
const PASSIVE_FORM = "PASSIVE-FORM"
const CHANGE_INFO = "CHANGE-INFO"

let initialState = {
    student: {
        id: 1,
        name: 'Кирилл',
        surname: 'Гекман',
        secondName: 'Эдупдович',
        age: 99,
        isMan: true
    },
    formActive: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVE_FORM:
            return {
                ...state,
                formActive: true
            };
        case CHANGE_INFO: {
            switch (action.item) {
                case 'name':
                    return {
                        ...state,
                        student: {
                            ...state.student,
                            name: action.newValue
                        }
                    };
                case 'surname':
                    return {
                        ...state,
                        student: {
                            ...state.student,
                            surname: action.newValue
                        }
                    };
                case 'secondName':
                    return {
                        ...state,
                        student: {
                            ...state.student,
                            secondName: action.newValue
                        }
                    };
                case 'age':
                    return {
                        ...state,
                        student: {
                            ...state.student,
                            age: action.newValue
                        }
                    };
            }
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
export default profileReducer;