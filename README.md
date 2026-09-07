Treasure Toy Nepal 🧸🇳🇵

Treasure Toy Nepal is a full-stack web application for discovering and managing educational, age-appropriate, and beneficial toys for children.

The project uses a FastAPI backend, React frontend, and PostgreSQL database.

🛠️ Tech Stack

Backend

Python

FastAPI

Uvicorn

SQLAlchemy

PostgreSQL

JWT Authentication

Passlib

Bcrypt

Python Dotenv

Email Validator

Frontend

React

React DOM

React Router DOM

npm

Database

PostgreSQL

Database name: TreasureToyNepal

📁 Project Structure

TreasureToyNepal/
├── treasuretoynepal-be/
│   ├── app/
│   │   └── main.py
│   ├── venv/
│   ├── .env
│   └── ...
├── treasuretoynepal-fe/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore

🚀 Getting Started

1. Clone the Repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>

🔹 Backend Setup

cd treasuretoynepal-be
python -m venv venv

Activate the Virtual Environment on Windows

source venv/Scripts/activate

If that does not work:

venv\Scripts\activate

Install Dependencies

pip install fastapi uvicorn python-dotenv
pip install sqlalchemy email-validator
pip install psycopg2-binary python-jose passlib bcrypt
pip install "python-jose[cryptography]"
pip install pyjwt
pip install "bcrypt==4.0.1"

🗄️ Database Setup

Treasure Toy Nepal uses PostgreSQL. Make sure PostgreSQL is installed and running, then create a database named TreasureToyNepal.


Variable

Description

Example

DATABASE_URL

PostgreSQL connection string

postgresql://postgres:password@localhost:5432/TreasureToyNepal

SECRET_KEY

Secret key for JWT authentication

secret-key 

ALGORITHM

JWT signing algorithm

HS256

ACCESS_TOKEN_EXPIRE_MINUTES

Token expiration time

30

Important: Never commit .env, database passwords, or real secret keys to GitHub.

Recommended .gitignore entries:

.env
venv/
__pycache__/
*.pyc

▶️ Run the Backend

cd treasuretoynepal-be
source venv/Scripts/activate
uvicorn app.main:app --reload

Backend:

http://127.0.0.1:8000

FastAPI Swagger documentation:

http://127.0.0.1:8000/docs


🔹 Frontend Setup

Open a new terminal:

cd treasuretoynepal-fe

Install dependencies:

npm install

If the required packages are not already in package.json:

npm install react react-dom react-router-dom

▶️ Run the Frontend

npm run dev

The frontend will normally be available at:

http://localhost:5173

🧪 Run the Full Application

Use two terminals.

Terminal 1 — Backend

cd treasuretoynepal-be
source venv/Scripts/activate
uvicorn app.main:app --reload

Terminal 2 — Frontend

cd treasuretoynepal-fe
npm run dev

Then open http://localhost:5173 in your browser.

🔐 Authentication

Treasure Toy Nepal uses JWT (JSON Web Tokens) for authentication.

ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

Access tokens expire after 30 minutes by default.

🔄 Application Architecture

┌──────────────────────┐
│    React Frontend    │
│    localhost:5173    │
└──────────┬───────────┘
           │ HTTP / API
           ▼
┌──────────────────────┐
│    FastAPI Backend   │
│    localhost:8000    │
└──────────┬───────────┘
           │ SQLAlchemy
           ▼
┌──────────────────────┐
│      PostgreSQL      │
│   TreasureToyNepal   │
└──────────────────────┘

📦 Main Features

🧸 Educational and beneficial toy recommendations

👶 Age-based toy categories

🔐 User authentication

🔑 JWT-based authorization

🗄️ PostgreSQL database

⚡ FastAPI REST API

⚛️ React frontend

🧭 React Router navigation

📱 Responsive user interface

👶 Age-Based Toy Categories

0–6 months

6–12 months

1–2 years

2–3 years

3–5 years

5–7 years

7–10 years

10–13 years

Each category can include toy name, age suitability, educational benefits, price, image, and other product information.

🔒 Security

Never upload the following to GitHub:

Database passwords

JWT secret keys

API keys

.env files

Production credentials

Use environment variables for sensitive configuration.

🛠️ Troubleshooting

PostgreSQL Connection Error

Check that:

PostgreSQL is installed.

PostgreSQL is running.

The TreasureToyNepal database exists.

Your PostgreSQL username and password are correct.

DATABASE_URL is correct.

Backend Does Not Start

Activate the virtual environment and reinstall dependencies if necessary:

source venv/Scripts/activate
pip install -r requirements.txt

Frontend Does Not Start

npm install
npm run dev

📌 Future Improvements

🛒 Shopping cart

❤️ Wishlist

⭐ Toy reviews and ratings

🔎 Advanced search and filtering

💰 Price-range filtering

🖼️ Toy image gallery

👨‍👩‍👧 Parent/guardian profiles

📊 Admin dashboard

📦 Order management

💳 Online payment integration

📧 Email notifications

☁️ Production deployment

📄 License

This project is currently intended for educational and development purposes.

🧸 Treasure Toy Nepal

Discover. Learn. Play. Grow. 🇳🇵
