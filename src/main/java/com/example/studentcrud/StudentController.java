package com.example.studentcrud;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class StudentController {

    @Autowired
    private StudentService service;

    @GetMapping("/students")
    public String listStudents(@RequestParam(required = false) String keyword,
                               @RequestParam(defaultValue = "1") int page,
                               Model model) {
        if (keyword != null && !keyword.isEmpty()) {
            model.addAttribute("students", service.searchStudents(keyword));
            model.addAttribute("keyword", keyword);
            model.addAttribute("totalPages", 1);
            model.addAttribute("currentPage", 1);
        } else {
            Page<Student> pageResult = service.getStudentsByPage(page);
            model.addAttribute("students", pageResult.getContent());
            model.addAttribute("totalPages", pageResult.getTotalPages());
            model.addAttribute("currentPage", page);
            model.addAttribute("keyword", "");
        }
        return "students";
    }

    @GetMapping("/students/new")
    public String showAddForm(Model model) {
        model.addAttribute("student", new Student());
        return "student-form";
    }

    @PostMapping("/students/save")
    public String saveStudent(@Valid @ModelAttribute Student student,
                              BindingResult result) {
        if (result.hasErrors()) {
            return "student-form";
        }
        service.saveStudent(student);
        return "redirect:/students";
    }

    @GetMapping("/students/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        model.addAttribute("student", service.getStudentById(id));
        return "student-form";
    }

    @GetMapping("/students/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return "redirect:/students";
    }
}