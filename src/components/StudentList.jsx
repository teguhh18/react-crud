import React from "react";

export default function StudentList({ students, editStudent, removeStudent }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editStudent(student.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
