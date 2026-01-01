🚀 Distributed Appointment & Queue Management System

A production-ready, distributed, real-time appointment & queue management system built with Spring Boot, React, PostgreSQL, Redis, WebSockets, and Docker-ready architecture.

This project simulates how high-traffic service systems (hospitals, banks, government offices, customer support) manage appointments, live queues, and admin control panels at scale.

🌟 Key Highlights

⚡ Real-time queue updates using WebSockets (STOMP + SockJS)

📈 Live dashboards with charts (Chart.js)

🔁 Event-driven architecture with Redis-backed queue logic

🧠 Clean separation of User & Admin workflows

📦 Production-ready frontend build (Netlify compatible)

🛠 Scalable backend design (Docker / Cloud ready)

🧩 System Architecture
┌──────────────┐        WebSocket        ┌──────────────┐
│   React UI   │  ◀──────────────────▶  │ Spring Boot  │
│ (User/Admin) │        (STOMP)          │   Backend    │
└──────────────┘                          └──────────────┘
        │                                         │
        │ REST APIs                               │
        ▼                                         ▼
┌──────────────┐                          ┌──────────────┐
│   Frontend   │                          │ PostgreSQL   │
│  (Netlify)  │                          │ (Persistence)│
└──────────────┘                          └──────────────┘
                                                  │
                                                  ▼
                                         ┌──────────────┐
                                         │    Redis     │
                                         │   (Queue)   │
                                         └──────────────┘

🖥️ Features
👤 User View

Create appointments

View live queue size

Receive real-time updates when queue changes

📸 Add screenshot here (User Dashboard)

🛠️ Admin Dashboard

View entire queue

Process next user

Clear queue

Monitor queue metrics via charts


<img width="1920" height="1080" alt="Screenshot 2025-12-24 051121" src="https://github.com/user-attachments/assets/492c01bf-33cf-4106-86b8-d13acb93d731" />

<img width="1916" height="942" alt="Screenshot 2026-01-01 152032" src="https://github.com/user-attachments/assets/b8f69aa7-0378-4e59-8e4d-49575b61e92b" />

<img width="1911" height="877" alt="Screenshot 2026-01-01 152053" src="https://github.com/user-attachments/assets/44e89b8a-3955-424d-97f1-8ec3dfef5e55" />


<img width="1891" height="822" alt="Screenshot 2026-01-01 153753" src="https://github.com/user-attachments/assets/1310356c-046c-4f7b-a4ae-1d2d251b8a6c" />

<img width="1893" height="824" alt="Screenshot 2026-01-01 153828" src="https://github.com/user-attachments/assets/cd4ae027-bed9-4f83-8896-6c97ffd30404" />




🧪 Tech Stack
Frontend

React

Material UI (MUI)

React Router

Axios

Chart.js

WebSockets (SockJS + STOMP)

Backend

Java Spring Boot

Spring WebSocket

Spring Data JPA

PostgreSQL

Redis

REST APIs

DevOps / Architecture

Docker-ready

CORS-configured

Environment-based configuration

Netlify / Render compatible

📂 Project Structure
distributed-queue-system/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── entity/
│   ├── repository/
│   ├── config/
│   └── QueueSystemApplication.java
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── chartSetup.js
│   │   └── App.js
│   └── build/
│
└── README.md

▶️ How to Run Locally
🔹 Backend
cd backend/queue-system
mvn spring-boot:run


Backend runs at:

http://localhost:8082

🔹 Frontend
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🌐 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/appointments	Create appointment
GET	/api/queue/all	Get queue
POST	/api/queue/add/{id}	Add to queue
GET	/api/queue/size	Queue size
DELETE	/api/queue/clear	Clear queue
🧠 Engineering Decisions

WebSockets over polling for real-time performance

Redis-based queue abstraction for scalability

Explicit Chart.js registration for tree-shaking & bundle optimization

Single Router pattern to avoid React routing conflicts

Strict separation of concerns between controller, service, and repository layers

🚀 Deployment

Frontend: Netlify

Backend: Render / AWS / Docker

Database: PostgreSQL

Cache: Redis


<img width="1919" height="882" alt="Screenshot 2026-01-01 154144" src="https://github.com/user-attachments/assets/6cd32a87-69d4-4436-a433-0e715a4b68af" />

<img width="916" height="473" alt="Screenshot 2026-01-01 154134" src="https://github.com/user-attachments/assets/126074aa-e543-41db-8ff9-5325c09c8f93" />


<img width="1917" height="880" alt="Screenshot 2025-12-24 011257" src="https://github.com/user-attachments/assets/5092b038-5f7b-48dc-8d82-b298fa15c316" />


<img width="1917" height="854" alt="Screenshot 2025-12-24 011456" src="https://github.com/user-attachments/assets/9a167bbb-bfd5-43a5-8627-90b7a1ffd0f3" />


📌 What I Learned

Designing real-time distributed systems

Debugging complex React + WebSocket issues

Managing CORS & environment boundaries

Building production-grade frontend builds

Handling async state updates & concurrency

📣 Future Enhancements

Authentication (JWT, Role-based access)

Priority queue (VIP / Emergency)

Auto-scaling Redis workers

Monitoring with Prometheus + Grafana

Kubernetes deployment

🙌 Author

Anushka Shree Bajpai
Final Year CSE | AI/ML & Backend Enthusiast

⭐ If you found this useful

Please ⭐ the repository — it motivates me to build more!
