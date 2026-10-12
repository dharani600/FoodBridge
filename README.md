# FoodBridge

**“Share Goodness. Reduce Waste.”**

FoodBridge is a comprehensive full-stack web application designed to connect surplus food providers (like function halls, restaurants, and caterers) with nearby orphanages, NGOs, shelters, and communities in need. 

## Features
- **User Roles:** Provider, Recipient, Volunteer, Admin.
- **Provider Dashboard:** Add events and surplus food.
- **Recipient Dashboard:** Discover nearby food and request donations.
- **Donation Tracking:** Follow the workflow (Available -> Requested -> Accepted -> Picked Up -> Delivered -> Completed).
- **Admin Analytics:** Platform statistics and verification.
- **Surplus Estimation:** A Java-based rule engine to estimate surplus food.

## Architecture
- **Frontend:** React, Vite, Axios, React Router
- **Backend:** Java 17, Spring Boot, Spring Data JPA, REST APIs
- **Database:** MySQL

## Setup Instructions

### Prerequisites
- Node.js 18+
- Java 17+
- MySQL 8.0+
- Maven

### Database Setup
1. Open MySQL terminal or Workbench.
2. Run `CREATE DATABASE foodbridge;`
3. Update `foodbridge-backend/src/main/resources/application.properties` with your database username and password.

### Running the Backend
1. Open a terminal.
2. Navigate to `foodbridge-backend`.
3. Run `mvnw spring-boot:run` (or `./mvnw` on Linux/Mac).

### Running the Frontend
1. Open a terminal.
2. Navigate to `foodbridge-frontend`.
3. Run `npm install` (if not already done).
4. Run `npm run dev`.

The frontend will start at `http://localhost:5173` and the backend will start at `http://localhost:8080`.
