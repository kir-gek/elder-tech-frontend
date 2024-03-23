import { connect } from "react-redux";
import { StudentProfile } from "./Profile";
import { activeFormAC, changeInfoAC, passiveFormAC } from "../../../Redux/student-profile-reducer";

const mapStateToProps = (state) => {
    const student = state.StudentProfilePage.student
    state = state.StudentProfilePage
    return {
        name: student.name,
        surname: student.surname,
        secondName: student.secondName,
        age: student.age,
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

export const StudentProfileContainer = connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
