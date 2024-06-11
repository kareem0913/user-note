import { getTaks } from "../modules/get-user-task";
import { displayErrors, clearErrors } from "../modules/display&hide-errors";
const url = window.location.href.split("/");
const id = url[url.length - 1];

const token = window.localStorage.getItem("userToken");
if (!token) {
    window.location.href = "/login";
}

// show task detaild in inputs
async function showTaskDetails() {
    const task = await getTaks(token, id);
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("long_description").value = task.long_description;
}

document.addEventListener("DOMContentLoaded", showTaskDetails);

// update task
async function updateTask(event) {
    event.preventDefault();
    clearErrors();
    const formData = new FormData(this);
    try {
        const req = await fetch(`http://localhost:8000/api/tasks/${id}`, {
            // method: "PUT",
            method: "post",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!req.ok) {
            const errorData = await req.json();
            displayErrors(errorData.errors);
        } else {
            const res = await req.json();
            window.location.href = `/tasks/${res.id}`;
        }
    } catch (error) {
        window.location.href = "/tasks";
        console.error(error);
    }
}

document.getElementById("editTaskForm").addEventListener("submit", updateTask);
