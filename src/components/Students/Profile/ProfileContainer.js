import { connect } from "react-redux";
import { StudentProfile } from "./Profile";
import { activeFormAC, changeInfoAC, passiveFormAC } from "../../../Redux/student-profile-reducer";

const mapStateToProps = (state) => {
    const student = state.StudentProfilePage.students[0]
    state = state.StudentProfilePage
    return {
        name: student.name,
        surname: student.surname,
        secondName: student.secondName,
        age: student.age,
        studentId: student.id,
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
        changeInfo: (studentId, item, newValue) =>{
            dispatch(changeInfoAC(studentId, item, newValue))
        }
    }
}

export const StudentProfileContainer = connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
