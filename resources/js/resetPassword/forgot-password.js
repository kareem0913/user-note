import { displayErrors, clearErrors } from "../modules/display&hide-errors";

async function sendEmail(event) {
    event.preventDefault();
    clearErrors();
    const formData = new FormData(this);
    // csrf token
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    try {
        const req = await fetch("http://localhost:8000/api/forgot-password", {
            method: "post",
            body: formData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
        });

        if (!req.ok) {
            const errorData = await req.json();
            displayErrors(errorData.errors);
        } else {
            alert("reset link is setn via email");
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("sendEmail").addEventListener("submit", sendEmail);
