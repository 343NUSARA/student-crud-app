function StudentList({ students, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td><span className="badge">{student.id}</span></td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>
            <td>{student.course}</td>
            <td>
              <button
                className="btn-edit"
                onClick={() => onEdit(student)}>
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => onDelete(student.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StudentList