package com.textmachinelab.project.controller;

import com.textmachinelab.project.entity.Category;
import com.textmachinelab.project.entity.Project;
import com.textmachinelab.project.entity.Tag;
import com.textmachinelab.project.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Project>> getActiveProjects() {
        List<Project> projects = projectService.getActiveProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(@RequestParam String title) {
        List<Project> projects = projectService.searchProjects(title);
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable String categoryName) {
        List<Project> projects = projectService.getProjectsByCategory(categoryName);
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/tag/{tagName}")
    public ResponseEntity<List<Project>> getProjectsByTag(@PathVariable String tagName) {
        List<Project> projects = projectService.getProjectsByTag(tagName);
        return ResponseEntity.ok(projects);
    }
    
    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        try {
            Project createdProject = projectService.createProject(project);
            return ResponseEntity.ok(createdProject);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, 
                                               @Valid @RequestBody Project projectDetails) {
        try {
            Project updatedProject = projectService.updateProject(id, projectDetails);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = projectService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = projectService.getAllTags();
        return ResponseEntity.ok(tags);
    }
}