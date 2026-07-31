# 🐳 Dockerized Vue + Node.js + MySQL Full-Stack App

A production-style, containerised full-stack application built to demonstrate real-world DevOps and full-stack development skills — from writing multi-stage Dockerfiles to orchestrating multi-container environments with Docker Compose.

![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Frontend-Vue.js-4FC08D?logo=vue.js&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)

---

## 📌 Overview

This project simulates a typical microservice-style web application stack, containerised end-to-end. It was built to strengthen and showcase hands-on experience with **Docker, container orchestration, and full-stack integration** — skills directly relevant to modern DevOps and software engineering roles.

The app consists of three services running in isolated containers, wired together via Docker Compose:

- **Frontend** — Vue.js single-page app that calls the backend API
- **Backend** — Node.js/Express REST API that queries the database
- **Database** — MySQL with persistent volume storage and init scripts

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | Vue.js                               |
| Backend      | Node.js, Express                     |
| Database     | MySQL 8                              |
| Orchestration| Docker, Docker Compose               |
| Tooling      | VS Code, Docker Desktop              |

---

## ✨ Key Features

- **Multi-stage Dockerfiles** for lean, optimised production builds (separate build and serve stages)
- **Docker Compose orchestration** managing three interdependent services with `depends_on` health checks
- **Persistent volumes** for MySQL data so container restarts don't wipe the database
- **Automated DB initialisation** via mounted `init.sql` scripts on first container start
- **Environment-based configuration** for database credentials and connection settings
- **Live API integration** — frontend button triggers a real HTTP call to the backend, which queries MySQL and returns live data (`"Hello from MySQL!"`)

---

## 📂 Project Structure

```
docker-voting-app/
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   └── public/
├── db/
│   └── init.sql
└── docker-compose.yml
```

---

## 🚀 Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Git installed
- Ports `8080`, `3000`, and `3306` free on your machine

### Step 1 — Clone the repository

```bash
git clone <repo-url>
cd docker-voting-app
```

### Step 2 — Review the environment configuration

Check the `docker-compose.yml` for the database credentials and update them if needed:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: root
  MYSQL_DATABASE: testdb
  MYSQL_USER: testdb
  MYSQL_PASSWORD: password
```

### Step 3 — Build and start all containers

```bash
docker compose up --build
```

This will:
1. Build the **backend** image from its Dockerfile (installs npm dependencies, exposes port 3000)
2. Build the **frontend** image (Vue app, exposes port 8080)
3. Pull the **MySQL 8** image and initialise the database using `db/init.sql`
4. Start all three containers on a shared Docker network, with the backend waiting on the database via `depends_on`

### Step 4 — Verify the containers are running

```bash
docker ps
```

Or open **Docker Desktop → Containers** to see live status, CPU/memory usage, and logs for each service (`db-1`, `backend-1`, `frontend-1`).

### Step 5 — Test the app

- Open the frontend → `http://localhost:8080`
- Click **"Get Message"** — this calls the backend API, which queries MySQL and returns a live result (e.g. `"Hello from MySQL!"`)

### Step 6 — (Optional) Inspect the database directly

```bash
docker exec -it <db-container-id> mysql -u root -p
```

```sql
SHOW DATABASES;
USE testdb;
SELECT * FROM messages;
```

### Step 7 — Stop and clean up

```bash
docker compose down
```

Add `-v` to also remove the persistent database volume and reset all data:

```bash
docker compose down -v
```

---

## 🐞 Troubleshooting

| Issue | Likely Cause | Fix |
|---|---|---|
| Frontend loads but "Get Message" fails | Backend not ready yet | Wait for MySQL health check to pass, then retry |
| `Port already in use` error | Another process on 8080/3000/3306 | Stop the conflicting process or change the port mapping in `docker-compose.yml` |
| Database resets on every run | Volume not persisted | Confirm `volumes:` is set correctly under the `db` service |
| Changes to code not reflected | Stale image | Rebuild with `docker compose up --build` |

---

## 🧠 What I Learned / Demonstrated

- Writing efficient, production-ready **Dockerfiles** (multi-stage builds, layer caching with `COPY package*.json` before `npm install`)
- Configuring **service dependencies and networking** across containers
- Managing **stateful services** (MySQL) safely with volumes
- Debugging containerised apps using **Docker Desktop** (logs, container stats, exec into containers)
- End-to-end integration between a JavaScript frontend and backend, talking to a relational database

---

## 📸 Screenshots

*(See `/screenshots` folder — includes Docker Desktop container view, VS Code Dockerfile/Compose setup, MySQL CLI output, and the running frontend.)*

---

## 📄 License

This project is open source and available for review — feel free to fork or reference it.

---

### 👋 About Me

Built as part of my hands-on learning in DevOps and containerisation. Open to full-stack, DevOps, or cloud engineering opportunities in Australia — happy to walk through the architecture and decisions in an interview.
