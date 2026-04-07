package com.example.studentcrud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Page<Student> getStudentsByPage(int pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, 5);
        return repository.findAll(pageable);
    }

    public void saveStudent(Student student) {
        repository.save(student);
    }

    public Student getStudentById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public List<Student> searchStudents(String keyword) {
        return repository.searchByName(keyword);
    }
}