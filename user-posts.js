document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    if (!userId) {
        alert("ไม่พบข้อมูลผู้ใช้");
        window.location.href = "index.html";
        return;
    }

    const postsList = document.getElementById("posts-list");
    const userName = document.getElementById("user-name");

    try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        userName.textContent = user.name;

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await postsResponse.json();

        posts.forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            postsList.appendChild(postDiv);
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});