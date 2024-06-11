// dont let user navigate to login or register route if he is already auth

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("userToken");

    const restrictedPaths = [
        "/login",
        "/register",
        "/forgotPassword",
        "/reset-password",
    ];

    if (token && restrictedPaths.includes(window.location.pathname)) {
        window.location.href = "/tasks";
    }
});
