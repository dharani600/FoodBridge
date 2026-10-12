package com.foodbridge.controller;

import com.foodbridge.entity.FoodDonation;
import com.foodbridge.repository.FoodDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*") // Allow frontend access
public class DonationController {

    @Autowired
    private FoodDonationRepository repository;

    @GetMapping
    public List<FoodDonation> getAllDonations() {
        return repository.findAll();
    }

    @GetMapping("/available")
    public List<FoodDonation> getAvailableDonations() {
        return repository.findByStatus("AVAILABLE");
    }

    @PostMapping
    public FoodDonation createDonation(@RequestBody FoodDonation donation) {
        donation.setStatus("AVAILABLE");
        return repository.save(donation);
    }

    @PutMapping("/{id}/request")
    public ResponseEntity<FoodDonation> requestDonation(@PathVariable Long id) {
        return repository.findById(id).map(donation -> {
            donation.setStatus("REQUESTED");
            return ResponseEntity.ok(repository.save(donation));
        }).orElse(ResponseEntity.notFound().build());
    }
}
