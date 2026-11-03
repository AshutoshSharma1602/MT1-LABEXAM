// Part A: Node.js HTTP server (without Express.js)
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory task array for Part A.
const tasks = [
  { id: 1, taskName: "Develop Login Page", assignedTo: "Rahul Sharma", status: "Pending" },
  { id: 2, taskName: "Design Dashboard", assignedTo: "Priya Verma", status: "In Progress" },
  { id: 3, taskName: "Test Registration Form", assignedTo: "Amit Kumar", status: "Completed" }
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // GET /
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>Employee Task Management</title></head>
        <body>
          <h1>Welcome to Employee Task Management System</h1>
          <p>Node.js HTTP server is running successfully.</p>
          <p>Visit <a href="/tasks">/tasks</a>, <a href="/about">/about</a> or <a href="/home">/home</a>.</p>
        </body>
      </html>
    `);
    return;
  }

  // GET /tasks
  if (method === "GET" && url === "/tasks") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(tasks, null, 2));
    return;
  }

  // POST /add-task
  if (method === "POST" && url === "/add-task") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      // Prevent unnecessarily large request bodies.
      if (body.length > 1_000_000) {
        res.writeHead(413, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ message: "Request body is too large" }));
        req.destroy();
      }
    });

    req.on("end", () => {
      let newTask;
      try {
        newTask = JSON.parse(body);
      } catch {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ message: "Invalid JSON body" }));
        return;
      }

      const requiredFields = ["id", "taskName", "assignedTo", "status"];
      const hasAllFields = newTask && requiredFields.every((field) =>
        Object.prototype.hasOwnProperty.call(newTask, field)
      );
      const validValues =
        hasAllFields &&
        Number.isInteger(Number(newTask.id)) &&
        Number(newTask.id) > 0 &&
        requiredFields.slice(1).every((field) =>
          typeof newTask[field] === "string" && newTask[field].trim() !== ""
        );

      if (!validValues) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({
          message: "Required fields: positive integer id, taskName, assignedTo and status"
        }));
        return;
      }

      if (tasks.some((task) => task.id === Number(newTask.id))) {
        res.writeHead(409, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ message: "A task with this id already exists" }));
        return;
      }

      const taskToAdd = {
        id: Number(newTask.id),
        taskName: newTask.taskName.trim(),
        assignedTo: newTask.assignedTo.trim(),
        status: newTask.status.trim()
      };
      tasks.push(taskToAdd);

      res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ message: "Task added successfully", task: taskToAdd }));
    });
    return;
  }

  // GET /about
  if (method === "GET" && url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Employee Task Management Application\nBuilt using Node.js HTTP and FS modules.");
    return;
  }

  // GET /home: serve index.html using the built-in FS module.
  if (method === "GET" && url === "/home") {
    const htmlPath = path.join(__dirname, "public", "index.html");
    fs.readFile(htmlPath, "utf8", (error, html) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ message: "Unable to read the home page" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    });
    return;
  }

  // All other routes or unsupported methods.
  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});
