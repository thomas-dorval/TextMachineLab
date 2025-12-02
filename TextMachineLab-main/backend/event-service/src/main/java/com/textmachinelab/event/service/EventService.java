package com.textmachinelab.event.service;

import com.textmachinelab.event.entity.Category;
import com.textmachinelab.event.entity.Event;
import com.textmachinelab.event.repository.CategoryRepository;
import com.textmachinelab.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    public List<Event> getActiveEvents() {
        return eventRepository.findByArchivedFalse();
    }
    
    public List<Event> getArchivedEvents() {
        return eventRepository.findByArchivedTrue();
    }
    
    public List<Event> getEventsByDate() {
        return eventRepository.findByOrderByEventDateDesc();
    }
    
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
    
    public List<Event> searchEvents(String title) {
        return eventRepository.findByTitleContainingIgnoreCase(title);
    }
    
    public List<Event> getUpcomingEvents() {
        return eventRepository.findByEventDateAfter(LocalDate.now());
    }
    
    public List<Event> getPastEvents() {
        return eventRepository.findByEventDateBefore(LocalDate.now());
    }
    
    public List<Event> getEventsByDateRange(LocalDate startDate, LocalDate endDate) {
        return eventRepository.findByEventDateBetween(startDate, endDate);
    }
    
    public List<Event> getEventsByCategory(String categoryName) {
        return eventRepository.findByCategoryName(categoryName);
    }
    
    public Event createEvent(Event event) {
        // Handle categories
        if (event.getCategories() != null) {
            Set<Category> managedCategories = event.getCategories().stream()
                    .map(category -> categoryRepository.findByName(category.getName())
                            .orElse(categoryRepository.save(category)))
                    .collect(Collectors.toSet());
            event.setCategories(managedCategories);
        }
        
        return eventRepository.save(event);
    }
    
    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setImageUrl(eventDetails.getImageUrl());
        event.setExternalLink(eventDetails.getExternalLink());
        event.setEventDate(eventDetails.getEventDate());
        event.setLocation(eventDetails.getLocation());
        event.setArchived(eventDetails.getArchived());
        
        // Handle categories
        if (eventDetails.getCategories() != null) {
            Set<Category> managedCategories = eventDetails.getCategories().stream()
                    .map(category -> categoryRepository.findByName(category.getName())
                            .orElse(categoryRepository.save(category)))
                    .collect(Collectors.toSet());
            event.setCategories(managedCategories);
        }
        
        return eventRepository.save(event);
    }
    
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
    
    public Event archiveEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setArchived(true);
        return eventRepository.save(event);
    }
    
    public Event unarchiveEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setArchived(false);
        return eventRepository.save(event);
    }
    
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}