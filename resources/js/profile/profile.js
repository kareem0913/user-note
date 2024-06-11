import { profile } from "../modules/get-user-data";

// get token number and cheack
const token = localStorage.getItem("userToken");
if (!token) {
    window.location.href = "/login";
}
async function showProfileData() {
    const user = await profile(token);
    // Build the profile content
    const profileContent = `
    <h2 class="card-title text-center">User Profile</h2>
    <p class="card-text"><strong>Name:</strong> ${user.name}</p>
    <p class="card-text"><strong>Email:</strong> ${user.email}</p>
    <p class="card-text"><strong>Joined:</strong> ${new Date(
        user.created_at
    ).toLocaleDateString()}</p>
`;
    document.getElementById("profile-content").innerHTML = profileContent;
}
document.addEventListener("DOMContentLoaded", showProfileData);
