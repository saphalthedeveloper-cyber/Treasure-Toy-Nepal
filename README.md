Treasure Toy Nepal

An e-commerce platform for kids' toys, organized by age category — built with React, FastAPI, and PostgreSQL, fully containerized with Docker.

Tech Stack
Frontend: React (Vite)
Backend: FastAPI (Python)
Database: PostgreSQL
Containerization: Docker & Docker Compose
Auth: JWT (python-jose) + bcrypt password hashing (passlib)
Prerequisites
Docker Desktop installed and running
Git
Getting Started
1. Clone the repository
bash
git clone https://github.com/saphalthedeveloper-cyber/Treasure-Toy-Nepal.git
cd Treasure-Toy-Nepal
2. Set up environment variables

Edit .env with your own secret values:

DB_PASSWORD=your_password_here
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=300

3. Build and run with Docker Compose
bash
docker compose up --build

This starts three services:

Service	URL	Description
Frontend	http://localhost:5173	React app
Backend	http://localhost:8000	FastAPI server
API Docs	http://localhost:8000/docs	Interactive Swagger docs
Database	localhost:5433 (external)	PostgreSQL (internal: 5432)
4. Seed the database

The first time you run the project, populate it with starting categories and products:

bash
docker exec -it treasure-toy-nepal-backend-1 python -m app.seed

This is safe to run multiple times — it only inserts data if the tables are currently empty.

Project Structure
Treasure-Toy-Nepal/
├── docker-compose.yml
├── .env.example
├── treasuretoy-be/          # FastAPI backend
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── database.py
│       ├── security.py
│       ├── seed.py          # Initial data seeding script
│       ├── models/
│       ├── routers/
│       └── schema/
└── treasuretoy-fe/           # React frontend
    ├── Dockerfile
    ├── package.json
    └── src/
Useful Commands

Start containers (detached/background):

bash
docker compose up -d

Stop containers:

bash
docker compose down

View logs:

bash
docker compose logs backend --tail 50

Rebuild after dependency changes:

bash
docker compose up --build

Access the database directly:

bash
docker exec -it treasure-toy-nepal-db-1 psql -U postgres -d treasuretoynepal

Re-run the seed script:

bash
docker exec -it treasure-toy-nepal-backend-1 python -m app.seed
Notes
Product/category images are served from treasuretoy-fe/public/images/. Filenames in the database must exactly match files in this folder (case-sensitive, exact extension).
Database data persists across restarts via a Docker volume (postgres_data). Running docker compose down is safe; running docker compose down -v will delete all data.
The PostgreSQL container is exposed on host port 5433 (not the default 5432) to avoid conflicts with any local PostgreSQL installation.
License

This project is proprietary and not licensed for public use/distribution.
