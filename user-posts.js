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

        posts.forEach(async (post) => {
            const postDiv = document.createElement("div");
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="toggle-comments" data-post-id="${post.id}">ดูความคิดเห็น</button>
                <div class="comments-container" id="comments-${post.id}" style="display: none;"></div>
            `;

            const toggleButton = postDiv.querySelector(".toggle-comments");
            toggleButton.addEventListener("click", async () => {
                const commentsContainer = document.getElementById(`comments-${post.id}`);
                if (commentsContainer.style.display === "none") {
                    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
                    const comments = await commentsResponse.json();

                    commentsContainer.innerHTML = comments.map(comment =>
                        `<p><strong>${comment.name}</strong>: ${comment.body}</p>`
                    ).join("");

                    commentsContainer.style.display = "block";
                    toggleButton.textContent = "ซ่อนความคิดเห็น";
                } else {
                    commentsContainer.style.display = "none";
                    toggleButton.textContent = "ดูความคิดเห็น";
                }
            });

            postsList.appendChild(postDiv);
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});