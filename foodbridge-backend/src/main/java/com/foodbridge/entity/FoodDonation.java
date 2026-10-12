package com.foodbridge.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "food_donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String foodName;

    @Column(nullable = false)
    private Integer quantity; // in servings

    @Column(nullable = false)
    private String foodType; // e.g., Veg, Non-Veg

    @Column(nullable = false)
    private String providerName;

    @Column(nullable = false)
    private String pickupLocation;

    @Column(nullable = false)
    private String contactNumber;

    private String preparationTime;

    private String expiryTime;

    @Column(nullable = false)
    private String status = "AVAILABLE"; // AVAILABLE, REQUESTED, COMPLETED

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
