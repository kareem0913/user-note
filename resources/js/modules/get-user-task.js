export async function getTaks(token, id) {
    try {
        const req = await fetch(`http://localhost:8000/api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!req.ok) {
            throw new Error(`HTTP error! status: ${req.status}`);
        }

        const res = await req.json();
        return res;
    } catch (error) {
        window.location.href = "/tasks";
        console.error(error);
    }
}
