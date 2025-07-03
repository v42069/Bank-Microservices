# 🏦 Bank Microservices

## 📚 Overview
A modular **banking system** built using **Spring Boot microservices**, designed for scalability, maintainability, and clean API design.

## 🛠️ Tech Stack

### 📦 Backend & Microservices
- Java 17
- Spring Boot
- Spring Cloud (Config, Gateway, Eureka, OpenFeign)
- Spring Data JPA
- Springdoc OpenAPI (Swagger)

### 🧱 Architecture & Design
- Microservices Architecture
- RESTful APIs
- DTO, Builder Pattern
- Resilience4j (Circuit Breaker, Retry, RateLimiter)
- Config Server with Git Integration

### 🗃️ Databases
- MySQL (via Docker)
- H2 (for initial development/testing)

### 🐳 Containerization & DevOps
- Docker & Docker Compose
- Buildpacks (alternative to Dockerfiles)
- DockerHub (image registry)

### 🔐 Configuration & Profiles
- Spring Profiles (`dev`, `qa`, `prod`)
- Externalized Configuration with Spring Cloud Config Server
- Encrypted Properties (JCE + Spring Cloud)

### 🔍 Observability & Monitoring
- **Logging**: Grafana + Loki + Promtail
- **Metrics**: Micrometer + Prometheus
- **Tracing**: OpenTelemetry + Grafana Tempo
- **Alerting**: Grafana Alerting

### 📄 Documentation
- Swagger UI (Springdoc OpenAPI)

---

## ⚙️ Microservices

- **🧾 Account & Customer Service** – Handles bank accounts and customer data  
- **🏠 Loans Service** – Manages loans  
- **💳 Cards Service** – Manages card issuance and operations  


---
### 🛠️ Git Branches Summary

### 🛠️ Service Infrastructure Branch Overview

The course also emphasizes critical service infrastructure components essential for running microservices in production:

- **🔍 Observability**: Enables monitoring and debugging of microservices using:
  - Centralized logging (Grafana + Loki + Promtail)
  - Metrics and dashboards (Micrometer + Prometheus + Grafana)
  - Distributed tracing (OpenTelemetry + Tempo)
  - Alerting mechanisms

- **🔐 Security**: Although detailed security sections come later, foundational infrastructure includes:
  - API Gateway security and filters
  - Property encryption using Spring Cloud Config
  - Service-level communication protection and token handling

These infrastructure features help ensure **scalability, reliability, and maintainability** of microservices in real-world environments.

---


### 🎯 Core Features

### ✅  CRUD Operations in Accounts Service
- Created JPA Entities and Repositories
- DTO pattern introduction and implementation
- Implemented:
  - Create Account API
  - Read Account API
  - Update Account API
  - Delete Account API
- Global exception handling
- Auto-update of audit fields (created_at, updated_at)

### ✅ API Documentation using Springdoc OpenAPI
- Integrated Swagger UI with Springdoc
- Used annotations:
  - `@OpenAPIDefinition`
  - `@Tag`, `@Operation`, `@ApiResponse`, `@Schema`
- Enhanced auto-generated documentation


### ✅ Dockerizing Microservices
- Dockerfile created for each service
- Generated Docker images locally
- Ran containers using Docker CLI
- Introduced Buildpacks and compared with Dockerfile approach
- Docker image push to DockerHub

### ✅ Spring Boot Profiles and Configuration Management
- Added `dev`, `qa`, and `prod` Spring profiles
- Externalized configs using:
  - `@Value`
  - `Environment`
  - `@ConfigurationProperties`
- Activated profiles using command-line/JVM/environment variables

### ✅ Spring Cloud Config Server
- Built `config-server` with Spring Cloud Config
- Externalized properties to file system and Git
- Implemented:
  - Encryption/decryption of config properties
  - Auto-refresh via `/actuator/refresh`
  - Spring Cloud Bus for distributed refresh
- Updated docker-compose for config server integration

### ✅ Integrating MySQL Database
- Replaced H2 DB with MySQL for all services
- Dockerized MySQL containers
- Created schema and updated entity configurations
- Demonstrated Docker networking with services + DB containers
- Added uptil this in seperate git branch use s7 image from docker hub

### ✅ Service Discovery with Eureka
- Implemented `eureka-server`
- Registered `accounts`, `loans`, `cards` microservices to Eureka
- Replaced static URLs with service names
- Feign client integration for service-to-service calls
- Eureka client deregistration on shutdown
- Docker `s8` version images

### ✅ API Gateway using Spring Cloud Gateway
- **Created Gateway microservice using Spring Cloud Gateway**
- Configured default and custom routing for internal services
- Added response headers using filters
- Implemented cross-cutting concerns: logging and tracing at the gateway
- Discussed design patterns used in API Gateway
- Docker `s9` version images

### ✅ Making Microservices Resilient
- Introduced need for resiliency and typical failure scenarios
- Implemented:
  - **Circuit Breaker pattern (Gateway + Feign)**
  - **Retry pattern (Accounts)**
  - **Rate Limiting using Redis RateLimiter (Gateway + Accounts)**
- Configured timeouts and aspect order for resilience
- Demoed resiliency using Docker Compose setup
- Docker `s10` version images

### ✅ Observability and Monitoring
- Concepts of **observability, centralized logging, and monitoring**
- Setup and integrated:
  - Logging: Grafana + Loki + Promtail
  - Metrics: Micrometer + Prometheus + Grafana Dashboards
  - Alerts: Grafana alerting with 2 approaches
  - Tracing: OpenTelemetry + Grafana Tempo
- Implemented log tracing, metrics collection, and distributed tracing end-to-end
- Docker `s11` version images

### 🔐 Microservices Security with OAuth2 & Keycloak
- Implementing OAuth2 and OpenID Connect:
- Implemented **Client Credentials Grant Flow**:
  - Keycloak setup and client registration
  - Gateway server secured as a **Resource Server**
  - Access tokens fetched and validated
  - Role-based authorization enforced inside the gateway
- Implemented **Authorization Code Grant Flow**:
  - User and client setup in Keycloak
  - Full login flow with token issuance and validation
  - Role-based access control using Keycloak roles and scopes
- Secured all microservices through API Gateway
- Final demo with **Docker Compose**: Auth server, Gateway, and services secured with Keycloak
- Docker `s12` version images


---

## 📦 How to Run

```bash
# Step 1: Select containers based on features 
docker-compose up --build

# Step 2: Access Swagger UI for services
http://localhost:<port>/swagger-ui.html
