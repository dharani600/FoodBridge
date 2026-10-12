-- MySQL Setup Script for FoodBridge

CREATE DATABASE IF NOT EXISTS foodbridge;
USE foodbridge;

-- Note: Spring Boot (Hibernate) is configured with ddl-auto=update, 
-- so it will automatically create the necessary tables based on the JPA entities.
-- Ensure you have set the correct username and password in application.properties.
