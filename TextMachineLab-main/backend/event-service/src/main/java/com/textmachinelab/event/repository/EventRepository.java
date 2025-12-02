package com.textmachinelab.event.repository;

import com.textmachinelab.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByArchivedFalse();
    
    List<Event> findByArchivedTrue();
    
    List<Event> findByTitleContainingIgnoreCase(String title);
    
    List<Event> findByEventDateAfter(LocalDate date);
    
    List<Event> findByEventDateBefore(LocalDate date);
    
    List<Event> findByEventDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT e FROM Event e JOIN e.categories c WHERE c.name = :categoryName")
    List<Event> findByCategoryName(@Param("categoryName") String categoryName);
    
    List<Event> findByOrderByEventDateDesc();
}