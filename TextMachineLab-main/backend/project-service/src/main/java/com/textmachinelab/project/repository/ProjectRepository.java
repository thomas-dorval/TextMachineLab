package com.textmachinelab.project.repository;

import com.textmachinelab.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByActiveTrue();
    
    List<Project> findByTitleContainingIgnoreCase(String title);
    
    @Query("SELECT p FROM Project p JOIN p.categories c WHERE c.name = :categoryName AND p.active = true")
    List<Project> findByCategoryName(@Param("categoryName") String categoryName);
    
    @Query("SELECT p FROM Project p JOIN p.tags t WHERE t.name = :tagName AND p.active = true")
    List<Project> findByTagName(@Param("tagName") String tagName);
}