export async function profile(token) {
    try {
        const req = await fetch("http://localhost:8000/api/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!req.ok) {
            throw new Error(`HTTP error! status: ${req.status}`);
        }

        const res = await req.json();
        return res.user;
    } catch (error) {
        console.error(error);
    }
}
