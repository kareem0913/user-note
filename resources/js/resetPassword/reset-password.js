import { displayErrors, clearErrors } from "../modules/display&hide-errors";

const urlParams = new URLSearchParams(window.location.search); // get query paramter token and email form url

// reset password function
async function resetPassword(event) {
    event.preventDefault();
    clearErrors(); // clear error from input

    const formData = new FormData(this);
    // add token and email to formdata instance
    formData.append("token", urlParams.get("token"));
    formData.append("email", urlParams.get("email"));
    // csrf token
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    try {
        const req = await fetch("http://localhost:8000/api/reset-password", {
            method: "post",
            body: formData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
        });
        if (!req.ok) {
            const errorData = await req.json();
            console.log(errorData.errors);
            displayErrors(errorData.errors); // dispaly error in form input
        } else {
            window.location.href = "/login";
        }
    } catch (error) {
        console.error(error);
    }
}

document
    .getElementById("resetPassword")
    .addEventListener("submit", resetPassword);
