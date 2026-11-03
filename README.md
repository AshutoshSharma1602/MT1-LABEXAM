# MT1-LABEXAM — Employee Task Management Web Application

A beginner-friendly Node.js lab project implementing the MT1 examination requirements.

## Requirements

- Node.js (LTS version recommended)
- npm
- EchoAPI or another API client for REST API testing

## Install dependencies

Open a terminal in the `MT1-LABEXAM` folder and run:

```bash
npm install
```

## Run Part A: HTTP server

In terminal 1:

```bash
npm run http
```

Expected message:

```text
HTTP Server running at http://localhost:3000
```

Open these URLs in a browser:

- http://localhost:3000/
- http://localhost:3000/tasks
- http://localhost:3000/about
- http://localhost:3000/home

To test `POST /add-task` in EchoAPI:

- Method: `POST`
- URL: `http://localhost:3000/add-task`
- Body: raw JSON

```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending"
}
```

## Run Part B: Express REST API

Open a second terminal in the same project folder:

```bash
npm run express
```

Expected message:

```text
Express Server running at http://localhost:4000
```

### EchoAPI endpoint tests

Base URL: `http://localhost:4000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/1` | Get task with ID 1 |
| POST | `/tasks` | Add a task |
| PUT | `/tasks/1` | Update task with ID 1 |
| DELETE | `/tasks/1` | Delete task with ID 1 |

For POST, choose **Body → raw → JSON**:

```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```

For PUT, choose **Body → raw → JSON**:

```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```

The PUT request updates all editable task fields. The task ID comes from the URL.

## Notes

- Part A does not use Express.js.
- Part B uses Express.js only.
- Both parts store data in separate in-memory JavaScript arrays.
- Data added or changed through an API is lost when its server is restarted.
- Part A and Part B can run at the same time because they use ports 3000 and 4000.
- The HTML page is served at `/home` by reading `public/index.html` with the built-in FS module.
- The `screenshots/` folder is provided for your own exam screenshots. Capture actual running server, browser and EchoAPI outputs; do not submit placeholder screenshots.

## GitHub submission

Create an empty GitHub repository named `MT1-LABEXAM`, then run these commands from this project folder (replace the URL with your repository URL):

```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/MT1-LABEXAM.git
git push -u origin main
```

Suggested commits as you work:

```bash
git add .
git commit -m "Implement Node HTTP server and routes"
git add .
git commit -m "Add FS-based home page serving"
git add .
git commit -m "Implement Express task CRUD API"
git add .
git commit -m "Add responsive task management home page"
git add .
git commit -m "Add API testing screenshots and documentation"
git push
```

Take screenshots of the actual outputs and save them inside `screenshots/`.
