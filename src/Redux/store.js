import studentProfileReducer from "./student-profile-reducer"
import {combineReducers, legacy_createStore as createStore} from "redux";
import teacherProfileReducer from "./teacher-profile-reducer";
import teacherMyCoursesReducer from "./teacher-myCourses-reducer";


let reducers = combineReducers({
    StudentProfilePage: studentProfileReducer,
    TeacherProfilePage: teacherProfileReducer,
    TeacherMyCoursesPage: teacherMyCoursesReducer
});

let store = createStore(reducers);
window.store = store;


// const store = configureStore({
//     reducers: {
//         profile: profileReducer
//     }
// })

export default store;