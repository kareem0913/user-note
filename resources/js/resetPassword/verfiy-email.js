// reset password function
async function verifyEmail(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    // CSRF token
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    try {
        const req = await fetch("/api/verify-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({ token: token }),
        });

        const res = await req.json();

        if (req.ok) {
            alert(res.message); // Show success message
            window.location.href = "/login"; // Redirect to login
        } else {
            alert(res.message); // Show error message
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while verifying the email.");
    }
}
document.addEventListener("DOMContentLoaded", verifyEmail);
