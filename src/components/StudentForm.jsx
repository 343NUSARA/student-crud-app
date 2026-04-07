import { useState } from 'react'

function StudentForm({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    student || { name: '', email: '', phone: '', course: '' }
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="form-card">
      <h2>{student ? '✏️ Edit Student' : '➕ Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>
        <div className="form-group">
          <label>Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}>
            <option value="">-- Select Course --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Business Administration">Business Administration</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">
            Save Student
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm