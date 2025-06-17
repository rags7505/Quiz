# 🚀 MERN Quiz App - Run Easily in 5 Minutes

A complete quiz application with login-only admin mode, quiz creation, guest participation, and score tracking.

---

## ✅ Features

* 👑 Admin login (only `Raghava` / `Raghava`)
* 📝 Admin can create/edit/delete quizzes
* 👥 Guests can take quizzes without login
* ⏱️ 5-minute timer with auto-submit
* ✅ Score is shown after submit
* 📊 Admin can view all unique users’ latest scores
* 🧠 Preloaded quizzes: Sports, Tech Stack, MERN, Core Java, AI/ML
* 💽 Redis used for session management
* 💅 Clean responsive UI with Tailwind CSS

---

## ⚙️ Quick Setup Instructions

### 1. 📥 Clone this repository

```bash
git clone https://github.com/YOUR_USERNAME/mern-quiz-app.git
cd mern-quiz-app
```

### 2. 🐳 Start Redis with Docker

```bash
docker run -d --name redis_server -p 6379:6379 redis
```

### 3. 🔧 Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/quizdb
JWT_SECRET=secret
PORT=5000
```

Run the seed script:

```bash
node seed.js
```

Start backend:

```bash
node server.js
```

### 4. 🌐 Setup Frontend

```bash
cd ../client
npm install
npm start
```

Now open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Admin Credentials

```bash
Username: Raghava
Password: Raghava
```

---

## 🧪 How To Use

### As Admin:

* Login using Raghava/Raghava
* Create quizzes, view results, delete quizzes

### As Guest:

* Click "Start Quiz"
* Enter your name
* Take the quiz → Timer auto-submits
* After submit: score is shown
* Homepage shows "Check My Score" only if quiz attempted

---

## 🧠 Ready to go

Just clone, install, run — and you’re live with a full-featured MERN Quiz App in minutes!
