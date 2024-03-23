import { connect } from "react-redux";
import { StudentProfile } from "./Profile";
import { activeFormStudentAC, changeInfoStudentAC, passiveFormStudentAC } from "../../../Redux/student-profile-reducer";

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
            dispatch(activeFormStudentAC())
        },
        passiveForm: () => {
            dispatch(passiveFormStudentAC())
        },
        changeInfo: (studentId, item, newValue) =>{
            dispatch(changeInfoStudentAC(studentId, item, newValue))
        }
    }
}

export const StudentProfileContainer = connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
