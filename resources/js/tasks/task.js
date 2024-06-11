import { getTaks } from "../modules/get-user-task";
const url = window.location.href.split("/");
const id = url[url.length - 1];

const token = window.localStorage.getItem("userToken");
if (!token) {
    window.location.href = "/login";
}

// display the task details
async function displayTasks() {
    const task = await getTaks(token, id);
    const taskDetailsContainer = document.getElementById("task-details");
    const status = task.completed ? "Completed" : "Incomplete";

    taskDetailsContainer.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">${task.title}</h2>
                <p class="card-text">${task.description}</p>
                <p class="card-text">${task.long_description}</p>
                <p class="card-text text-muted">Created at: ${
                    task.created_at
                }</p>
                <p class="card-text text-muted">Updated at: ${
                    task.updated_at
                }</p>
                <p class="card-text">Status: <span class="badge ${
                    task.completed ? "bg-success" : "bg-danger"
                }">${status}</span></p>
            </div>
        `;
    document.getElementById("toggle-btn").textContent = task.completed
        ? "Mark as Incomplete"
        : "Mark as Complete";
}
document.addEventListener("DOMContentLoaded", displayTasks);

// delete the task
async function deleteTask() {
    try {
        const req = await fetch(`http://localhost:8000/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!req.ok) {
            throw new Error(`HTTP error! status: ${req.status}`);
        }

        window.location.href = "/tasks";
    } catch (error) {
        console.error(error);
    }
}
document.getElementById("delete-btn").addEventListener("click", deleteTask);

// toggle complete
async function toggleComplete() {
    // http://localhost:8000/api/tasks/toggle-complete/1
    try {
        const req = await fetch(
            `http://localhost:8000/api/tasks/toggle-complete/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!req.ok) {
            throw new Error(`HTTP error! status: ${req.status}`);
        }

        displayTasks();
    } catch (error) {
        console.error(error);
    }
}
document.getElementById("toggle-btn").addEventListener("click", toggleComplete);

// navigate to edit task
document.getElementById('edit-btn').addEventListener('click', () => {
    window.location.href = `/edit-task/${id}`
})