import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [keyword, setKeyword] = useState('')

  // Added states
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(API_URL)
      setStudents(response.data)
    } catch (err) {
      setError('Failed to load students. Is the server running?')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const handleSave = async (student) => {
    try {
      if (student.id) {
        await axios.put(`${API_URL}/${student.id}`, student)
      } else {
        await axios.post(API_URL, student)
      }

      await fetchStudents()
      setShowForm(false)
      setEditingStudent(null)

    } catch (err) {
      setError('Failed to save student. Please try again.')
      console.error(err)
    }
  }

  const handleEdit = (student) => {
    setEditingStudent(student)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        await fetchStudents()
      } catch (err) {
        setError('Failed to delete student.')
        console.error(err)
      }
    }
  }

  const handleAddNew = () => {
    setEditingStudent(null)
    setShowForm(true)
  }

  const handleSearch = (e) => {
    setKeyword(e.target.value)
  }

  const filteredStudents =
    keyword.trim() === ''
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
            onClick={() => setKeyword('')}
          >
            Clear
          </button>
        )}
      </div>

      {/* Loading UI */}
      {loading && <p className="loading">Loading students...</p>}

      {/* Error UI */}
      {error && <p className="error">{error}</p>}

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

      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="error-msg">{error}</p>}


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