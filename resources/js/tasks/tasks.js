// get token number and check
const token = localStorage.getItem("userToken");
if (!token) {
    window.location.href = "/login";
}

// fetch tasks from the server
export async function tasks() {
    try {
        const req = await fetch("http://localhost:8000/api/tasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!req.ok) {
            throw new Error(`HTTP error! status: ${req.status}`);
        }

        const res = await req.json();
        displayTasks(res); // display the tasks
    } catch (error) {
        console.error(error);
    }
}

// display the tasks to user
function displayTasks(tasks) {
    const tasksContainer = document.getElementById("tasks-container");

    tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("card", "mb-4", "card-width");

        taskElement.innerHTML = `
            <div class="card-body">
                <a href='/tasks/${task.id}' class="card-title"> ${
            task.title
        }</a>
                <p class="card-text">${task.description}</p>
                
                <span class="badge ${
                    task.completed ? "bg-success" : "bg-danger"
                }">${task.completed ? "Completed" : "Incomplete"}</span>

            </div>
        `;

        tasksContainer.appendChild(taskElement);
    });
}

document.addEventListener("DOMContentLoaded", tasks);
