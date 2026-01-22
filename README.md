📋 Task Management System (Full Stack)

A full-stack Task Management System built using Node.js + TypeScript (Backend) and Next.js + TypeScript (Frontend).

This project demonstrates real-world backend architecture, secure authentication, and a modern web frontend following clean coding practices.

🚀 Features Overview
🔐 Authentication & Security

User Registration & Login

JWT-based authentication

Access Token (short-lived)

Refresh Token (long-lived)

Secure password hashing using bcrypt

Protected routes

Logout & token invalidation

📝 Task Management

Create, Read, Update, Delete tasks

Each task belongs to a logged-in user

Toggle task status (Completed / Pending)

Pagination, filtering, and search support

🛠 Tech Stack
🔹 Backend
Layer	Technology
Runtime	Node.js
Language	TypeScript
Framework	Express.js
Database	PostgreSQL / MySQL
ORM	Prisma
Auth	JWT
Security	bcrypt
Validation	Zod / custom middleware
🔹 Frontend
Layer	Technology
Framework	Next.js (App Router)
Language	TypeScript
State Management	Zustand
API Client	Axios
Styling	Basic CSS / Extendable
📂 Backend Project Structure
server/
 ├─ src/
 │   ├─ controllers/
 │   │   ├─ auth.controller.ts
 │   │   └─ task.controller.ts
 │   │
 │   ├─ routes/
 │   │   ├─ auth.routes.ts
 │   │   └─ task.routes.ts
 │   │
 │   ├─ services/
 │   │   ├─ auth.service.ts
 │   │   └─ task.service.ts
 │   │
 │   ├─ middlewares/
 │   │   ├─ auth.middleware.ts
 │   │   └─ error.middleware.ts
 │   │
 │   ├─ utils/
 │   │   ├─ jwt.ts
 │   │   └─ hash.ts
 │   │
 │   ├─ prisma/
 │   │   └─ schema.prisma
 │   │
 │   └─ index.ts
 │
 ├─ .env
 ├─ package.json
 └─ tsconfig.json

🔑 Backend Authentication Flow

User registers → password hashed using bcrypt

User logs in → Access & Refresh tokens generated

Access Token used for protected routes

Refresh Token used to get new Access Token

Logout clears refresh token

🔌 Backend API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
POST	/auth/refresh	Refresh access token
POST	/auth/logout	Logout user
Task Routes (Protected)
Method	Endpoint	Description
GET	/tasks	Get tasks (pagination, filter, search)
POST	/tasks	Create task
PATCH	/tasks/:id	Update task
DELETE	/tasks/:id	Delete task
PATCH	/tasks/:id/toggle	Toggle task status
🗄 Database Design (Simplified)
User

id

email

password

createdAt

Task

id

title

description

completed

userId

createdAt

updatedAt

▶️ Backend Setup
1️⃣ Install Dependencies
cd server
npm install

2️⃣ Environment Variables (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/tms
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret

3️⃣ Prisma Setup
npx prisma migrate dev
npx prisma generate

4️⃣ Run Backend
npm run dev


Backend runs on:
http://localhost:4000

▶️ Frontend Setup
cd client
npm install
npm run dev


Frontend runs on:
http://localhost:3000

🧪 Validation & Error Handling

Proper HTTP status codes (400, 401, 404, 500)

Centralized error handling middleware

Auth middleware protects task routes

🔮 Future Enhancements

Refresh token rotation

Role-based access

Rate limiting

Better UI (Tailwind / ShadCN)

Docker support

Unit & integration tests

👨‍💻 Author

Rahmat
Backend-Focused Developer
Strong interest in APIs, system design, and scalable architectures.