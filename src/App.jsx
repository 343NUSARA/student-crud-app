import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import './App.css'

const API_URL = 'http://localhost:8080/api/students'

function App() {
  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [keyword, setKeyword] = useState('')

  const fetchStudents = useCallback(async () => {
    const response = await axios.get(API_URL)
    setStudents(response.data)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSave = async (student) => {
    if (student.id) {
      await axios.put(`${API_URL}/${student.id}`, student)
    } else {
      await axios.post(API_URL, student)
    }
    fetchStudents()
    setShowForm(false)
    setEditingStudent(null)
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      await axios.delete(`${API_URL}/${id}`)
      fetchStudents()
    }
  }

  const handleAddNew = () => {
    setEditingStudent(null)
    setShowForm(true)
  }

  const handleSearch = (e) => {
    setKeyword(e.target.value)
  }

  const filteredStudents = keyword.trim() === ''
    ? students
    : students.filter(student =>
        student.name.toLowerCase().includes(keyword.toLowerCase())
      )

  return (
    <div className="app">
      <div className="header">
        <h1>🎓 Student Management</h1>
        <button className="btn-add" onClick={handleAddNew}>
          + Add Student
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={keyword}
          onChange={handleSearch}
          autoComplete="off"
        />
        {keyword && (
          <button
            className="btn-clear"
            onClick={() => setKeyword('')}>
            Clear
          </button>
        )}
      </div>

      {showForm && (
        <StudentForm
          student={editingStudent}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingStudent(null)
          }}
        />
      )}

      <StudentList
        students={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <p className="result-count">
        Showing {filteredStudents.length} of {students.length} students
      </p>
    </div>
  )
}

export default App