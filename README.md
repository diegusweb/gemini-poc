# gemini-poc

# Gemini Project - Backend Task App

This document provides a guide on how to set up and run the backend task application for the Gemini project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Java Development Kit (JDK)**: Version 17 or later is recommended.
- **Apache Maven**: The project uses Maven for dependency management and build automation.
- **Docker**: Used for containerization.
- **Docker Compose**: Used for defining and managing multi-container Docker applications.

## Getting Started

You must enter the project folder and follow the following instructions to launch the project,

### Build  with Docker Compose
```sh
docker-compose  build
```

### Run with Docker Compose
```sh
docker-compose up -d
```

### Open Browser
```sh
http://localhost:5173/

```

This command will:

- Build the necessary Docker images based on the Dockerfile in the current directory.
- Start the containers for the MongoDB database and the backend application.

The -d flag runs the containers in detached mode (in the background).

### Verifying the Installation
Check Running Containers
```sh
docker ps
```
You should see two containers running: one named mongodb and the other springboot-app.

### Access the Application
The backend application should now be accessible at http://localhost:8080/.

### Project Structure
- backend/backend-task-app: This directory contains the source code for the Spring Boot backend application.
- Dockerfile: This file contains instructions for building the Docker image for the backend application.
- docker-compose.yml: This file defines the services (MongoDB and Spring Boot app) and their configurations for Docker Compose.

### Key Technologies
- Spring Boot: Provides a framework for building stand-alone, production-grade Spring-based applications.
- Spring Web: Enables building web applications using the Model-View-Controller (MVC) pattern.
- Spring Data MongoDB: Provides integration with the MongoDB database.
- MongoDB: A NoSQL document database used for storing application data.
