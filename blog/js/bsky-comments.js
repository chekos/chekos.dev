// Function to fetch and render the comment section
async function renderCommentSection(containerId, uri) {
    const container = document.getElementById(containerId);
    if (!container || !uri) return;

    container.innerHTML = "<p>Loading comments...</p>";

    try {
        const thread = await getPostThread(uri);

        if (!thread || !thread.replies || thread.replies.length === 0) {
            container.innerHTML = "<p>No comments available</p>";
            return;
        }

        const sortedReplies = thread.replies.sort(sortByLikes);

        const commentsDiv = document.createElement("div");
        sortedReplies.forEach((reply) => {
            if (!reply.post) return;

            const commentDiv = document.createElement("div");
            commentDiv.className = "comment";

            const authorName = reply.post.author?.displayName || reply.post.author?.handle || "Unknown Author";
            const text = reply.post.record?.text || "No content";

            commentDiv.innerHTML = `
                <p><strong>${authorName}</strong></p>
                <p>${text}</p>
                <p>Likes: ${reply.post.likeCount || 0}, Reposts: ${reply.post.repostCount || 0}</p>
            `;

            commentsDiv.appendChild(commentDiv);
        });

        container.innerHTML = "";
        container.appendChild(commentsDiv);
    } catch (err) {
        console.error("Error rendering comment section:", err);
        container.innerHTML = "<p>Error loading comments</p>";
    }
}

// Fetch the thread data
async function getPostThread(uri) {
    const params = new URLSearchParams({ uri });
    const url = "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?" + params.toString();

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const data = await res.json();

        if (!data.thread || !data.thread.replies) {
            throw new Error("Thread or replies missing in response");
        }

        return data.thread;
    } catch (err) {
        console.error("Error fetching thread data:", err);
        return null;
    }
}

// Sort replies by likes
function sortByLikes(a, b) {
    return (b.post.likeCount || 0) - (a.post.likeCount || 0);
}

// Initialize comments section if `bsky_post_uri` is found
document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.getElementById("comment-section");
    if (commentsContainer) {
        const bskyPostUri = commentsContainer.getAttribute("data-bsky-post-uri");

        if (bskyPostUri) {
            renderCommentSection("comment-section", bskyPostUri);
        }
    }
});
