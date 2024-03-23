const ACTIVE_FORM = "ACTIVE-FORM"
const PASSIVE_FORM = "PASSIVE-FORM"
const CHANGE_INFO = "CHANGE-INFO"

let initialState = {
    teacher: {
        id: 1,
        name: 'Препод',
        surname: 'Гекман',
        secondName: 'Эдупдович',
        age: 99,
        isMan: true
    }   ,
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
            switch (action.item) {
                case 'name':
                    return {
                        ...state,
                        teacher: {
                            ...state.teacher,
                            name: action.newValue
                        }
                    };
                case 'surname':
                    return {
                        ...state,
                        teacher: {
                            ...state.teacher,
                            surname: action.newValue
                        }
                    };
                case 'secondName':
                    return {
                        ...state,
                        teacher: {
                            ...state.teacher,
                            secondName: action.newValue
                        }
                    };
                case 'age':
                    return {
                        ...state,
                        teacher: {
                            ...state.teacher,
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
export default teacherProfileReducer;