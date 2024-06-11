// create new task

import { displayErrors, clearErrors } from "../modules/display&hide-errors";

// get token number
const token = localStorage.getItem("userToken");
if (!token) {
    window.location.href = "/login";
}

const createTaskForm = document.getElementById("createTaskForm");
// fetch data and send to server
async function createTask(event) {
    event.preventDefault();

    // clear erros from form
    clearErrors();
    const formData = new FormData(this);

    // csrf token
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    try {
        const req = await fetch("http://localhost:8000/api/tasks", {
            method: "post",
            body: formData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
                Authorization: `Bearer ${token}`,
            },
        });

        if (req.ok) {
            const res = await req.json();
            window.location.href = "/tasks";
        } else {
            const errorData = await req.json();
            displayErrors(errorData.errors);
        }
    } catch (error) {
        console.log(error);
    }
}

createTaskForm.addEventListener("submit", createTask);
