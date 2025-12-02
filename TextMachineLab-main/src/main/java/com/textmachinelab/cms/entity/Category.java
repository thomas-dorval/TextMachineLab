package com.textmachinelab.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "categories")
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String name;
    
    @NotBlank
    @Size(max = 100)
    @Column(name = "display_name", nullable = false)
    private String displayName;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryType type;
    
    // Constructors
    public Category() {}
    
    public Category(String name, String displayName, CategoryType type) {
        this.name = name;
        this.displayName = displayName;
        this.type = type;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    
    public CategoryType getType() { return type; }
    public void setType(CategoryType type) { this.type = type; }
}