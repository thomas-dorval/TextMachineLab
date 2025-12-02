package com.textmachinelab.publication.repository;

import com.textmachinelab.publication.entity.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    
    List<Publication> findByYear(Integer year);
    
    List<Publication> findByVenueContainingIgnoreCase(String venue);
    
    List<Publication> findByAuthorsContainingIgnoreCase(String author);
    
    List<Publication> findByTitleContainingIgnoreCase(String title);
    
    List<Publication> findByYearBetween(Integer startYear, Integer endYear);
    
    List<Publication> findByOrderByYearDesc();
}