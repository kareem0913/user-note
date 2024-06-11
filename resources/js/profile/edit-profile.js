import { profile } from "../modules/get-user-data";
import { displayErrors, clearErrors } from "../modules/display&hide-errors";

// get token number
const token = localStorage.getItem("userToken");
if (!token) {
    window.location.href = "/login";
}

// show user data in inputs
async function showProfileData() {
    const user = await profile(token);
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
}

document.addEventListener("DOMContentLoaded", showProfileData);

// update data
const editForm = document.getElementById("userEdit");

async function updateUserDate(event) {
    event.preventDefault();

    // clear errors from form
    clearErrors();
    const formData = new FormData(this);

    // csrf token
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    try {
        const req = await fetch("http://localhost:8000/api/profile", {
            body: formData,
            method: "post",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
                Authorization: `Bearer ${token}`,
            },
        });
        if (req.ok) {
            const res = await req.json();
            window.location.href = "/profile";
        } else {
            const errorData = await req.json();
            displayErrors(errorData.errors);
        }
    } catch (error) {
        console.log(error);
    }
}

editForm.addEventListener("submit", updateUserDate);
