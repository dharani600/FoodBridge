@echo off
echo ============================================
echo  FoodBridge Backend Startup Script
echo ============================================
echo.

SET JAVA_HOME=C:\Program Files\Java\jdk-21.0.10
SET PATH=%JAVA_HOME%\bin;%PATH%

echo Java version:
java -version
echo.
echo Starting Spring Boot backend on http://localhost:8080 ...
echo Press Ctrl+C to stop the server.
echo.

mvnw.cmd spring-boot:run
