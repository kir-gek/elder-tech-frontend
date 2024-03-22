import profileReducer from "./profile-reducer"
import {combineReducers, legacy_createStore as createStore} from "redux";


let reducers = combineReducers({
    StudentProfilePage: profileReducer
});
let store = createStore(reducers);

window.store=store;




// const store = configureStore({
//     reducers: {
//         profile: profileReducer
//     }
// })

export default store;