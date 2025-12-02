package com.textmachinelab.publication.service;

import com.textmachinelab.publication.entity.Publication;
import com.textmachinelab.publication.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublicationService {
    
    @Autowired
    private PublicationRepository publicationRepository;
    
    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }
    
    public List<Publication> getAllPublicationsByYear() {
        return publicationRepository.findByOrderByYearDesc();
    }
    
    public Optional<Publication> getPublicationById(Long id) {
        return publicationRepository.findById(id);
    }
    
    public List<Publication> getPublicationsByYear(Integer year) {
        return publicationRepository.findByYear(year);
    }
    
    public List<Publication> getPublicationsByYearRange(Integer startYear, Integer endYear) {
        return publicationRepository.findByYearBetween(startYear, endYear);
    }
    
    public List<Publication> searchPublicationsByTitle(String title) {
        return publicationRepository.findByTitleContainingIgnoreCase(title);
    }
    
    public List<Publication> searchPublicationsByAuthor(String author) {
        return publicationRepository.findByAuthorsContainingIgnoreCase(author);
    }
    
    public List<Publication> searchPublicationsByVenue(String venue) {
        return publicationRepository.findByVenueContainingIgnoreCase(venue);
    }
    
    public Publication createPublication(Publication publication) {
        return publicationRepository.save(publication);
    }
    
    public Publication updatePublication(Long id, Publication publicationDetails) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publication not found"));
        
        publication.setTitle(publicationDetails.getTitle());
        publication.setAuthors(publicationDetails.getAuthors());
        publication.setVenue(publicationDetails.getVenue());
        publication.setYear(publicationDetails.getYear());
        publication.setPdfUrl(publicationDetails.getPdfUrl());
        publication.setBibtexData(publicationDetails.getBibtexData());
        
        return publicationRepository.save(publication);
    }
    
    public void deletePublication(Long id) {
        publicationRepository.deleteById(id);
    }
    
    public String generateBibtex(Publication publication) {
        return String.format(
            "@article{%s%d,\n" +
            "  title={%s},\n" +
            "  author={%s},\n" +
            "  journal={%s},\n" +
            "  year={%d}\n" +
            "}",
            publication.getTitle().replaceAll("\\s+", "").toLowerCase(),
            publication.getYear(),
            publication.getTitle(),
            publication.getAuthors(),
            publication.getVenue(),
            publication.getYear()
        );
    }
}