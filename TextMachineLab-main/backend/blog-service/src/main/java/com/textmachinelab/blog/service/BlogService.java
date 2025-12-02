package com.textmachinelab.blog.service;

import com.textmachinelab.blog.entity.BlogPost;
import com.textmachinelab.blog.entity.PostStatus;
import com.textmachinelab.blog.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    
    @Autowired
    private BlogPostRepository blogPostRepository;
    
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();
    }
    
    public List<BlogPost> getAllBlogPostsByDate() {
        return blogPostRepository.findByOrderByCreatedAtDesc();
    }
    
    public List<BlogPost> getPublishedPosts() {
        return blogPostRepository.findByStatusOrderByPublishedAtDesc(PostStatus.PUBLISHED);
    }
    
    public List<BlogPost> getDraftPosts() {
        return blogPostRepository.findByStatus(PostStatus.DRAFT);
    }
    
    public List<BlogPost> getArchivedPosts() {
        return blogPostRepository.findByStatus(PostStatus.ARCHIVED);
    }
    
    public Optional<BlogPost> getBlogPostById(Long id) {
        return blogPostRepository.findById(id);
    }
    
    public List<BlogPost> getBlogPostsByAuthor(String author) {
        return blogPostRepository.findByAuthor(author);
    }
    
    public List<BlogPost> getPublishedPostsByAuthor(String author) {
        return blogPostRepository.findByAuthorAndStatus(author, PostStatus.PUBLISHED);
    }
    
    public List<BlogPost> searchBlogPostsByTitle(String title) {
        return blogPostRepository.findByTitleContainingIgnoreCase(title);
    }
    
    public List<BlogPost> searchBlogPostsByContent(String content) {
        return blogPostRepository.findByContentContainingIgnoreCase(content);
    }
    
    public BlogPost createBlogPost(BlogPost blogPost) {
        blogPost.setStatus(PostStatus.DRAFT);
        return blogPostRepository.save(blogPost);
    }
    
    public BlogPost updateBlogPost(Long id, BlogPost blogPostDetails) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found"));
        
        blogPost.setTitle(blogPostDetails.getTitle());
        blogPost.setContent(blogPostDetails.getContent());
        blogPost.setAuthor(blogPostDetails.getAuthor());
        
        // Don't change status here, use separate methods
        return blogPostRepository.save(blogPost);
    }
    
    public BlogPost publishBlogPost(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found"));
        
        blogPost.setStatus(PostStatus.PUBLISHED);
        blogPost.setPublishedAt(LocalDateTime.now());
        
        return blogPostRepository.save(blogPost);
    }
    
    public BlogPost unpublishBlogPost(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found"));
        
        blogPost.setStatus(PostStatus.DRAFT);
        blogPost.setPublishedAt(null);
        
        return blogPostRepository.save(blogPost);
    }
    
    public BlogPost archiveBlogPost(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found"));
        
        blogPost.setStatus(PostStatus.ARCHIVED);
        
        return blogPostRepository.save(blogPost);
    }
    
    public BlogPost unarchiveBlogPost(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog post not found"));
        
        blogPost.setStatus(PostStatus.DRAFT);
        
        return blogPostRepository.save(blogPost);
    }
    
    public void deleteBlogPost(Long id) {
        blogPostRepository.deleteById(id);
    }
}