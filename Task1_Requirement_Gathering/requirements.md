# Task 1: Requirement Gathering & Planning — TaskFlow Pro

## Project Goal
TaskFlow Pro is a full-stack task management web application that allows users to register, log in securely, and manage their personal tasks. The application uses JWT authentication to protect user access and provides a responsive interface for task management.. Users can add, view, complete, and delete tasks. The goal is to give users a clean way to
track daily to-dos without unnecessary complexity.

## Target Users
- Individuals who want a lightweight personal task tracker
- Students managing assignments and deadlines
- Small teams tracking shared to-do lists (future scope)

## Functional Requirements
1. User can register with name, email and password.
2. User can log in securely.
3. User can log out.
4. User can add a task.
5. User can view tasks.
6. User can mark tasks as complete/incomplete.
7. User can delete tasks.
8. User can filter tasks (All / Active / Completed).
9. Passwords are securely hashed using bcrypt.
10. Protected APIs require JWT authentication.

## User Roles
- **Guest/User**: Can create, view, update, and delete their own tasks
- **(Future) Admin**: Can manage all users' tasks — out of scope for this internship demo

## User Flow
1. User opens the application.
2. User registers or logs in.
3. After successful login, the dashboard opens.
4. User adds, updates, completes or deletes tasks.
5. User logs out.

## Scope
### In Scope
- Single-page task manager UI
- REST API backend (CRUD operations for tasks)
- Task filtering
- Basic responsive design
- Authentication

### Out of Scope (Future Enhancements)
- User authentication / multi-user accounts
- Due dates & reminders/notifications
- Team collaboration & shared boards

## Tools Used
- Google Docs / Notion style planning (this markdown file)
- Trello-style task breakdown (see below)

## Task Breakdown (Trello-style backlog)
| Task | Priority | Status |
|------|----------|--------|
| Design wireframes | High | Done (Task 2) |
| Build static HTML/CSS UI | High | Done (Task 3) |
| Add JS interactivity | High | Done (Task 3) |
| Build Express REST API | High | Done (Task 4) |
| Connect frontend to backend | High | Done (Task 4) |
