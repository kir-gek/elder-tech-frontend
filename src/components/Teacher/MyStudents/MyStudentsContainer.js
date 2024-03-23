import { connect } from "react-redux";
import { MyStudents } from "./MyStudents";

const mapStateToProps = (state) => {
    const students = state.StudentProfilePage.students
    return {
        students: students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export const MyStudentsContainer = connect(mapStateToProps, mapDispatchToProps)(MyStudents)