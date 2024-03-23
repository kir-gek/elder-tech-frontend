import { connect } from "react-redux";
import { MyCourses } from "./MyCourses";
import { addNewCourseAC, changeValueCourseFormAC } from "../../../Redux/teacher-myCourses-reducer";


const mapStateToProps = (state) => {
    state = state.TeacherMyCoursesPage
    return {
        courses: state.courses,

        newCourse: state.formValueName,
        newDescription: state.formValueDescription
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCourse: () => {
            dispatch(addNewCourseAC())
        },
        changeValueForm: (name, description) =>{
            dispatch(changeValueCourseFormAC(name, description))
        }
    }
}

export const MyCoursesContainer = connect(mapStateToProps, mapDispatchToProps)(MyCourses)