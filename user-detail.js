document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    if (!userId) {
        alert("ไม่พบข้อมูลผู้ใช้");
        window.location.href = "index.html";
        return;
    }

    const userDetail = document.getElementById("user-detail");
    const viewPostsButton = document.getElementById("view-posts");

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        userDetail.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>อีเมล:</strong> ${user.email}</p>
            <p><strong>ที่อยู่:</strong> ${user.address.city}, ${user.address.street}</p>
        `;

        viewPostsButton.addEventListener("click", () => {
            window.location.href = `user-posts.html?id=${user.id}`;
        });

    } catch (error) {
        console.error("Error fetching user details:", error);
    }
});