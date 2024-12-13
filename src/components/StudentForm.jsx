import React from "react";
import StudentList from "../components/StudentList";

export default class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStudents: [],
      inputName: "",
      inputGrade: "",
      isEditing: false,
      currentStudentId: null,
    };
    this.studentId = 0;
  }

  clearForm = () => {
    this.setState({
      inputName: "",
      inputGrade: "",
      isEditing: false,
      currentStudentId: null,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  removeStudent = (id) => {
    this.setState((prevState) => ({
      dataStudents: prevState.dataStudents.filter(
        (student) => student.id !== id
      ),
    }));
  };

  editStudent = (id) => {
    this.handleForm();
    const student = this.state.dataStudents.find((student) => student.id === id);
    this.setState({
      inputName: student.name,
      inputGrade: student.grade,
      isEditing: true,
      currentStudentId: id,
    });
  };

  handleSaveStudent = (e) => {
    e.preventDefault();
    const { inputName, inputGrade, isEditing, currentStudentId } = this.state;

    if (!inputName || !inputGrade) {
      alert("Name and Grade are required");
      return;
    }

    if (isEditing) {
      this.setState((prevState) => ({
        dataStudents: prevState.dataStudents.map((student) =>
          student.id === currentStudentId
            ? { ...student, name: inputName, grade: inputGrade }
            : student
        ),
        inputName: "",
        inputGrade: "",
        isEditing: false,
        currentStudentId: null,
      }));
    } else {
      const newStudent = {
        id: this.studentId++,
        name: inputName,
        grade: inputGrade,
      };

      this.setState((prevState) => ({
        dataStudents: [...prevState.dataStudents, newStudent],
        inputName: "",
        inputGrade: "",
      }));
    }

    this.handleForm();
  };

  handleForm = () => {
    const form = document.getElementById("form");
    const addStudent = document.getElementById("addStudent");
    if (form.style.display === "block") {
      form.style.display = "none";
      addStudent.className = "btn btn-outline-primary my-3";
      addStudent.innerText = "Add Student";
    } else {
      form.style.display = "block";
      addStudent.innerText = "Close";
      addStudent.className = "btn btn-outline-danger my-3";
    }
  };

  render() {
    const { dataStudents, isEditing } = this.state;
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">List Of Students</h1>

        <div className="d-flex">
          <button
            id="addStudent"
            type="button"
            className="btn btn-outline-primary my-3"
            onClick={() => {
              this.clearForm();
              this.handleForm();
            }}
          >
            Add Student
          </button>
        </div>

        <div id="form" className="card p-4 shadow" style={{ display: "none" }}>
          <form>
            <div className="mb-3">
              <label className="form-label" htmlFor="formInputName">
                Name
              </label>
              <input
                type="text"
                name="inputName"
                value={this.state.inputName}
                onChange={this.handleInputChange}
                required
                className="form-control"
                id="formInputName"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="formInputGrade">
                Grade
              </label>
              <input
                type="number"
                name="inputGrade"
                value={this.state.inputGrade}
                onChange={this.handleInputChange}
                required
                className="form-control"
                id="formInputGrade"
              />
            </div>
            <div className="d-flex justify-content-between">
              {isEditing ? (
                <button
                  id="buttonUpdate"
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleSaveStudent}
                >
                  Update
                </button>
              ) : (
                <button
                  id="buttonSave"
                  type="button"
                  className="btn btn-outline-success"
                  onClick={this.handleSaveStudent}
                >
                  Save
                </button>
              )}
              <button
                id="buttonClear"
                type="button"
                className="btn btn-outline-warning"
                onClick={this.clearForm}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {this.state.dataStudents.length > 0 ? (
          <StudentList
            students={dataStudents}
            removeStudent={this.removeStudent}
            editStudent={this.editStudent}
          />
        ) : (
          <p className="text-center mt-4">No Data</p>
        )}
      </div>
    );
  }
}
