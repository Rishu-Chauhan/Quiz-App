# 📝 Quiz App – Online Quiz Management System

Quiz App is a full-stack web application that allows users to participate in online quizzes, test their knowledge, and track their performance. It provides role-based access for Admins and Users, making quiz creation and management simple and efficient.

## 🚀 Features

### 👨‍🎓 User Features
- User registration and login.
- Browse available quizzes.
- Attempt online quizzes.
- Submit answers and calculate scores.
- View quiz results.
- Track quiz performance.

### 🔐 Admin Features
- Admin login and authentication.
- Create and manage quizzes.
- Add, update, and delete questions.
- Manage quiz information.
- View user quiz scores and results.

## 🛠️ Tech Stack

**Frontend**
- React.js
- HTML5
- CSS3
- JavaScript
- Vite

**Backend**
- Java
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- REST APIs

**Database**
- MySQL

**Development Tools**
- IntelliJ IDEA
- Visual Studio Code
- MySQL Workbench
- Postman
- Git & GitHub

## 🏗️ Project Architecture

```text
Quiz-App/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/main/java/
│   │   └── ...
│   └── src/main/resources/
│       └── application.properties
│
└── README.md
```

*Update the folder structure to match your actual project.*

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Quiz-App
```

### 2. Configure MySQL Database

Create a database in MySQL:

```sql
CREATE DATABASE quiz_app;
```

Configure your backend `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_app
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 3. Run the Backend

Open the backend project in IntelliJ IDEA and run the main Spring Boot application.

Or use:

```bash
mvn spring-boot:run
```

### 4. Run the Frontend

Open the frontend directory in VS Code:

```bash
npm install
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 🔄 Application Workflow

1. User registers or logs in.
2. User explores available quizzes.
3. User selects and attempts a quiz.
4. Answers are submitted for evaluation.
5. The application calculates and displays the score.
6. Admin manages quizzes, questions, and results.

## 🎯 Project Objective

The objective of this project is to develop an interactive online examination platform that simplifies quiz management, improves accessibility, and allows users to evaluate their knowledge through online assessments.

## 👨‍💻 Developer

**Rishu Chauhan**

- GitHub: [Rishu Chauhan](https://github.com/Rishu-Chauhan)
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/)

---

⭐ If you like this project, don't forget to give it a star!

**Note:** This project is developed for educational and learning purposes.
