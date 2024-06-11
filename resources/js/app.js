import "./bootstrap";
import { profile } from "./modules/get-user-data";
import { displayErrors, clearErrors } from "./modules/display&hide-errors";

// user register
const form = document.getElementById("userRegister");

async function register(event) {
    event.preventDefault();

    // clear erros from form
    clearErrors();
    const formData = new FormData(form);

    // csrf token
    const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    try {
        const req = await fetch("http://localhost:8000/api/register", {
            method: "post",
            body: formData,
            headers: {
                "X-CSRF-TOKEN": token,
            },
        });
        if (req.ok) {
            const res = await req.json();
            localStorage.setItem("userToken", res.userToken);
            window.location.href = "/tasks";
        } else {
            const errorData = await req.json();
            displayErrors(errorData.errors);
        }
    } catch (error) {
        console.log(error);
    }
}

if (form) {
    form.addEventListener("submit", register);
}

// user login
async function login(event) {
    event.preventDefault();
    clearErrors();
    const formData = new FormData(loginForm);
    // csrf token
    const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    try {
        const req = await fetch("http://localhost:8000/api/login", {
            method: "post",
            body: formData,
            headers: {
                "X-CSRF-TOKEN": token,
            },
        });

        if (req.ok) {
            const res = await req.json();
            localStorage.setItem("userToken", res.userToken);
            window.location.href = "/tasks";
        } else {
            const errorData = await req.json();
            displayErrors(errorData.errors);
        }
    } catch (error) {
        console.log(error);
    }
}

const loginForm = document.getElementById("userLogin");
if (loginForm) {
    loginForm.addEventListener("submit", login);
}

// logout function
const token = localStorage.getItem("userToken");
const logout = document.getElementById("logout");

async function handleLogout() {
    try {
        const req = await fetch("http://localhost:8000/api/logout", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!req.ok) {
            throw new Error(`HTTP error! status: ${req.status}`);
        }

        localStorage.removeItem("userToken");
        window.location.href = "/login";
    } catch (error) {
        console.error("Error logging out:", error);
    }
}

// check if user is authenticated and update the navbar
async function updateNavbar() {
    const authLinks = document.getElementById("auth-links");

    if (token) {
        try {
            const user = await profile(token);

            authLinks.innerHTML = `
                <li class="nav-item dropdown">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                        ${user.name}
                    </a>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                         <a href="/profile" class="dropdown-item">profile</a>
                        <button id="logout" class="dropdown-item">Logout</button>
                    </div>
                </li>
            `;

            // Add logout event listener
            document
                .getElementById("logout")
                .addEventListener("click", handleLogout);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            // If there is an error, redirect to login page
            window.location.href = "/login";
        }
    } else {
        authLinks.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
            </li>
        `;
    }
}
document.addEventListener("DOMContentLoaded", updateNavbar);
