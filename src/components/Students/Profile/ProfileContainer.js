import { connect } from "react-redux";
import { StudentProfile } from "./Profile";

const mapStateToProps = (state) => {
    return {
        name: state.StudentProfilePage.name,
        surname: state.StudentProfilePage.surname,
        secondName: state.StudentProfilePage.secondName,
        age: state.StudentProfilePage.age
    }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export const StudentProfileContainer = connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
