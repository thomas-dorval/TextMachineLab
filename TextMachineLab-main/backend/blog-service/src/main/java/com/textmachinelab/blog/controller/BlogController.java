package com.textmachinelab.blog.controller;

import com.textmachinelab.blog.entity.BlogPost;
import com.textmachinelab.blog.service.BlogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class BlogController {
    
    @Autowired
    private BlogService blogService;
    
    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {
        List<BlogPost> blogPosts = blogService.getAllBlogPosts();
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/by-date")
    public ResponseEntity<List<BlogPost>> getAllBlogPostsByDate() {
        List<BlogPost> blogPosts = blogService.getAllBlogPostsByDate();
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/published")
    public ResponseEntity<List<BlogPost>> getPublishedPosts() {
        List<BlogPost> blogPosts = blogService.getPublishedPosts();
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/drafts")
    public ResponseEntity<List<BlogPost>> getDraftPosts() {
        List<BlogPost> blogPosts = blogService.getDraftPosts();
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/archived")
    public ResponseEntity<List<BlogPost>> getArchivedPosts() {
        List<BlogPost> blogPosts = blogService.getArchivedPosts();
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Long id) {
        return blogService.getBlogPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/author/{author}")
    public ResponseEntity<List<BlogPost>> getBlogPostsByAuthor(@PathVariable String author) {
        List<BlogPost> blogPosts = blogService.getBlogPostsByAuthor(author);
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/author/{author}/published")
    public ResponseEntity<List<BlogPost>> getPublishedPostsByAuthor(@PathVariable String author) {
        List<BlogPost> blogPosts = blogService.getPublishedPostsByAuthor(author);
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/search/title")
    public ResponseEntity<List<BlogPost>> searchByTitle(@RequestParam String title) {
        List<BlogPost> blogPosts = blogService.searchBlogPostsByTitle(title);
        return ResponseEntity.ok(blogPosts);
    }
    
    @GetMapping("/search/content")
    public ResponseEntity<List<BlogPost>> searchByContent(@RequestParam String content) {
        List<BlogPost> blogPosts = blogService.searchBlogPostsByContent(content);
        return ResponseEntity.ok(blogPosts);
    }
    
    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(@Valid @RequestBody BlogPost blogPost) {
        try {
            BlogPost createdBlogPost = blogService.createBlogPost(blogPost);
            return ResponseEntity.ok(createdBlogPost);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable Long id, 
                                                 @Valid @RequestBody BlogPost blogPostDetails) {
        try {
            BlogPost updatedBlogPost = blogService.updateBlogPost(id, blogPostDetails);
            return ResponseEntity.ok(updatedBlogPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/publish")
    public ResponseEntity<BlogPost> publishBlogPost(@PathVariable Long id) {
        try {
            BlogPost publishedBlogPost = blogService.publishBlogPost(id);
            return ResponseEntity.ok(publishedBlogPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/unpublish")
    public ResponseEntity<BlogPost> unpublishBlogPost(@PathVariable Long id) {
        try {
            BlogPost unpublishedBlogPost = blogService.unpublishBlogPost(id);
            return ResponseEntity.ok(unpublishedBlogPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/archive")
    public ResponseEntity<BlogPost> archiveBlogPost(@PathVariable Long id) {
        try {
            BlogPost archivedBlogPost = blogService.archiveBlogPost(id);
            return ResponseEntity.ok(archivedBlogPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/unarchive")
    public ResponseEntity<BlogPost> unarchiveBlogPost(@PathVariable Long id) {
        try {
            BlogPost unarchivedBlogPost = blogService.unarchiveBlogPost(id);
            return ResponseEntity.ok(unarchivedBlogPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable Long id) {
        try {
            blogService.deleteBlogPost(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}