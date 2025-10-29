package com.textmachinelab.project.service;

import com.textmachinelab.project.entity.Category;
import com.textmachinelab.project.entity.Project;
import com.textmachinelab.project.entity.Tag;
import com.textmachinelab.project.repository.CategoryRepository;
import com.textmachinelab.project.repository.ProjectRepository;
import com.textmachinelab.project.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private TagRepository tagRepository;
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public List<Project> getActiveProjects() {
        return projectRepository.findByActiveTrue();
    }
    
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    
    public List<Project> searchProjects(String title) {
        return projectRepository.findByTitleContainingIgnoreCase(title);
    }
    
    public List<Project> getProjectsByCategory(String categoryName) {
        return projectRepository.findByCategoryName(categoryName);
    }
    
    public List<Project> getProjectsByTag(String tagName) {
        return projectRepository.findByTagName(tagName);
    }
    
    public Project createProject(Project project) {
        // Handle categories
        if (project.getCategories() != null) {
            Set<Category> managedCategories = project.getCategories().stream()
                    .map(category -> categoryRepository.findByName(category.getName())
                            .orElse(categoryRepository.save(category)))
                    .collect(Collectors.toSet());
            project.setCategories(managedCategories);
        }
        
        // Handle tags
        if (project.getTags() != null) {
            Set<Tag> managedTags = project.getTags().stream()
                    .map(tag -> tagRepository.findByName(tag.getName())
                            .orElse(tagRepository.save(tag)))
                    .collect(Collectors.toSet());
            project.setTags(managedTags);
        }
        
        return projectRepository.save(project);
    }
    
    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setImageUrl(projectDetails.getImageUrl());
        project.setExternalLink(projectDetails.getExternalLink());
        project.setActive(projectDetails.getActive());
        
        // Handle categories
        if (projectDetails.getCategories() != null) {
            Set<Category> managedCategories = projectDetails.getCategories().stream()
                    .map(category -> categoryRepository.findByName(category.getName())
                            .orElse(categoryRepository.save(category)))
                    .collect(Collectors.toSet());
            project.setCategories(managedCategories);
        }
        
        // Handle tags
        if (projectDetails.getTags() != null) {
            Set<Tag> managedTags = projectDetails.getTags().stream()
                    .map(tag -> tagRepository.findByName(tag.getName())
                            .orElse(tagRepository.save(tag)))
                    .collect(Collectors.toSet());
            project.setTags(managedTags);
        }
        
        return projectRepository.save(project);
    }
    
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
}