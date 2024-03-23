const CHANGE_VALUE_COURSE_FORM = 'CHANGE-VALUE-COURSE-FORM'
const ADD_NEW_COURSE = 'ADD-NEW-COURSE'


let initialState = {
    courses: [{
        id: 1,
        title: 'Введение в компьютерную грамотность',
        description: 'описание курса введение в компьютерную грамотность'
    }],
    formValueName: 'введите название курса',
    formValueDescription: 'введите описание курса'
}

const teacherMyCoursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_VALUE_COURSE_FORM:
            return {
                ...state,
                formValueName: action.textName,
                formValueDescription: action.textDescription
            };
        case ADD_NEW_COURSE:
            return {
                ...state,
                courses: [...state.courses, { id: 5, title: state.formValueName, description: state.formValueDescription }],
                formValueName: 'введите название курса',
                formValueDescription: 'введите описание курса'
            };
        default:
            return state;
    }
}

export const changeValueCourseFormAC = (textName, textDescription) => ({ type: CHANGE_VALUE_COURSE_FORM, textName, textDescription })
export const addNewCourseAC = () => ({ type: ADD_NEW_COURSE })
export default teacherMyCoursesReducer;