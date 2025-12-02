package com.textmachinelab.publication.controller;

import com.textmachinelab.publication.entity.Publication;
import com.textmachinelab.publication.service.PublicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publications")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class PublicationController {
    
    @Autowired
    private PublicationService publicationService;
    
    @GetMapping
    public ResponseEntity<List<Publication>> getAllPublications() {
        List<Publication> publications = publicationService.getAllPublications();
        return ResponseEntity.ok(publications);
    }
    
    @GetMapping("/by-year")
    public ResponseEntity<List<Publication>> getAllPublicationsByYear() {
        List<Publication> publications = publicationService.getAllPublicationsByYear();
        return ResponseEntity.ok(publications);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Publication> getPublicationById(@PathVariable Long id) {
        return publicationService.getPublicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/year/{year}")
    public ResponseEntity<List<Publication>> getPublicationsByYear(@PathVariable Integer year) {
        List<Publication> publications = publicationService.getPublicationsByYear(year);
        return ResponseEntity.ok(publications);
    }
    
    @GetMapping("/year-range")
    public ResponseEntity<List<Publication>> getPublicationsByYearRange(
            @RequestParam Integer startYear, 
            @RequestParam Integer endYear) {
        List<Publication> publications = publicationService.getPublicationsByYearRange(startYear, endYear);
        return ResponseEntity.ok(publications);
    }
    
    @GetMapping("/search/title")
    public ResponseEntity<List<Publication>> searchByTitle(@RequestParam String title) {
        List<Publication> publications = publicationService.searchPublicationsByTitle(title);
        return ResponseEntity.ok(publications);
    }
    
    @GetMapping("/search/author")
    public ResponseEntity<List<Publication>> searchByAuthor(@RequestParam String author) {
        List<Publication> publications = publicationService.searchPublicationsByAuthor(author);
        return ResponseEntity.ok(publications);
    }
    
    @GetMapping("/search/venue")
    public ResponseEntity<List<Publication>> searchByVenue(@RequestParam String venue) {
        List<Publication> publications = publicationService.searchPublicationsByVenue(venue);
        return ResponseEntity.ok(publications);
    }
    
    @PostMapping
    public ResponseEntity<Publication> createPublication(@Valid @RequestBody Publication publication) {
        try {
            Publication createdPublication = publicationService.createPublication(publication);
            return ResponseEntity.ok(createdPublication);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Publication> updatePublication(@PathVariable Long id, 
                                                       @Valid @RequestBody Publication publicationDetails) {
        try {
            Publication updatedPublication = publicationService.updatePublication(id, publicationDetails);
            return ResponseEntity.ok(updatedPublication);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        try {
            publicationService.deletePublication(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}/bibtex")
    public ResponseEntity<String> getPublicationBibtex(@PathVariable Long id) {
        return publicationService.getPublicationById(id)
                .map(publication -> {
                    String bibtex = publication.getBibtexData() != null ? 
                        publication.getBibtexData() : 
                        publicationService.generateBibtex(publication);
                    return ResponseEntity.ok(bibtex);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}