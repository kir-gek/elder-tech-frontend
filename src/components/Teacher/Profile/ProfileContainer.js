import { connect } from "react-redux";
import { teacherProfile } from "./Profile";
import { activeFormAC, changeInfoAC, passiveFormAC } from "../../../Redux/teacher-profile-reducer";

const mapStateToProps = (state) => {
    const teacher = state.TeacherProfilePage.teacher
    state = state.TeacherProfilePage
    return {
        name: teacher.name,
        surname: teacher.surname,
        secondName: teacher.secondName,
        age: teacher.age,
        formActive: state.formActive
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        activeForm: () => {
            dispatch(activeFormAC())
        },
        passiveForm: () => {
            dispatch(passiveFormAC())
        },
        changeInfo: (item, newValue) =>{
            dispatch(changeInfoAC(item, newValue))
        }
    }
}

export const TeacherProfileContainer = connect(mapStateToProps, mapDispatchToProps)(teacherProfile);
