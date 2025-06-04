# 🏦 Bank Microservices

## 📚 Overview
A modular **banking system** built using **Spring Boot microservices**, designed for scalability, maintainability, and clean API design.

## 🏷️ Architecture
- Follows the **Microservices Architecture** pattern.
- Each service is **independently deployable** and communicates via **REST APIs**.
- Uses **centralized configuration**, **service discovery**, and **client-side load balancing**.

## 🛠️ Tech Stack

| Category             | Tools                                              |
|----------------------|----------------------------------------------------|
| **Language & Framework** | Java, Spring Boot, Spring Cloud                |
| **Build Tool**       | Maven                                              |
| **Database**         | MySQL, H2 (for dev/test)                           |
| **API Docs**         | OpenAPI + Swagger UI                              |
| **Mapping**          | MapStruct                                          |
| **Containerization** | Docker, Docker Compose                            |
| **Messaging**        | RabbitMQ                                           |
| **Config Management**| Spring Cloud Config Server, Spring Cloud Bus      |
| **Observability**    | Spring Boot Actuator                               |

## ⚙️ Microservices

- **🧾 Account & Customer Service** – Handles bank accounts and customer data  
- **🏠 Loans Service** – Manages loans  
- **💳 Cards Service** – Manages card issuance and operations  

## ✅ Key Functionalities

### 🎯 Core Features

- **Global Exception Handling**  
  Standardized API error responses via a centralized handler.

- **Custom API Response Structure**  
  All APIs return a consistent response format for better readability and integration.

- **OpenAPI Documentation**  
  Swagger UI for live documentation and testing of all APIs.

### 🚀 Infrastructure Features

- **Containerized Services**  
  Dockerized microservices using Docker Compose for local orchestration.

- **Centralized Configuration**  
  Uses Spring Cloud Config Server (with GitHub backend) to manage external properties per environment.

- **Encrypted Configuration Support**  
  Sensitive values in config (like DB passwords) are encrypted using JCE.

- **Dynamic Configuration Reloading**  
  Spring Cloud Bus + RabbitMQ enables live config updates without restarting services.

- **Service Discovery and Load Balancing**  
  Eureka for service registration and discovery.  
  Feign clients for declarative REST communication and client-side load balancing.

## 📦 How to Run

```bash
# Step 1: Start all containers
docker-compose up --build

# Step 2: Access Swagger UI for services
http://localhost:<port>/swagger-ui.html
