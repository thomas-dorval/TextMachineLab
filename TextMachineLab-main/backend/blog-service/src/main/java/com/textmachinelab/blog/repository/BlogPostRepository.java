package com.textmachinelab.blog.repository;

import com.textmachinelab.blog.entity.BlogPost;
import com.textmachinelab.blog.entity.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    List<BlogPost> findByStatus(PostStatus status);
    
    List<BlogPost> findByAuthor(String author);
    
    List<BlogPost> findByTitleContainingIgnoreCase(String title);
    
    List<BlogPost> findByContentContainingIgnoreCase(String content);
    
    List<BlogPost> findByStatusAndPublishedAtBefore(PostStatus status, LocalDateTime date);
    
    List<BlogPost> findByStatusOrderByPublishedAtDesc(PostStatus status);
    
    List<BlogPost> findByAuthorAndStatus(String author, PostStatus status);
    
    List<BlogPost> findByOrderByCreatedAtDesc();
}