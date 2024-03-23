import { connect } from "react-redux";
import { teacherProfile } from "./Profile";
import { activeFormTeacherAC, changeInfoTeacherAC, passiveFormTeacherAC } from "../../../Redux/teacher-profile-reducer";

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
            dispatch(activeFormTeacherAC())
        },
        passiveForm: () => {
            dispatch(passiveFormTeacherAC())
        },
        changeInfo: (item, newValue) =>{
            dispatch(changeInfoTeacherAC(item, newValue))
        }
    }
}

export const TeacherProfileContainer = connect(mapStateToProps, mapDispatchToProps)(teacherProfile);
