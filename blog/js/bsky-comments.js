// Fetch the thread data
async function getPostThread(uri) {
    const params = new URLSearchParams({ uri });
    const url = "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?" + params.toString();

    try {
        console.log("Fetching thread data from:", url);
        const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("API response error:", res.status, res.statusText);
            console.error("Error details from API:", errorText);
            throw new Error(errorText || "Unknown API error");
        }

        const data = await res.json();
        console.log("Fetched data:", data);

        if (!data.thread || !data.thread.replies) {
            console.error("Thread or replies missing in response");
            throw new Error("Invalid thread data");
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

// Recursive function to render nested replies
function renderNestedReplies(reply, parentDiv) {
    if (!reply.replies || reply.replies.length === 0) return;

    const nestedDiv = document.createElement("div");
    nestedDiv.className = "nested-replies";
    nestedDiv.style.borderLeft = "2px solid #ddd";
    nestedDiv.style.marginLeft = "10px";
    nestedDiv.style.paddingLeft = "10px";

    reply.replies.sort(sortByLikes).forEach((nestedReply) => {
        const nestedCommentDiv = document.createElement("div");
        nestedCommentDiv.className = "comment";

        const authorName = nestedReply.post.author?.displayName || nestedReply.post.author?.handle || "Unknown Author";
        const text = nestedReply.post.record?.text || "No content";

        nestedCommentDiv.innerHTML = `
            <p><strong>${authorName}</strong></p>
            <p>${text}</p>
            <div class="actions">
                ${renderActions(nestedReply.post)}
            </div>
        `;

        nestedDiv.appendChild(nestedCommentDiv);
        renderNestedReplies(nestedReply, nestedDiv); // Recursive call
    });

    parentDiv.appendChild(nestedDiv);
}

// Render the action buttons (likes, reposts, replies) with SVG icons
function renderActions(post) {
    return `
        <div class="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="pink" viewBox="0 0 24 24" stroke-width="1.5" stroke="pink" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span>${post.likeCount || 0} likes</span>
        </div>
        <div class="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
            <span>${post.repostCount || 0} reposts</span>
        </div>
        <div class="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#7FBADC" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7FBADC" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <span>${post.replyCount || 0} replies</span>
        </div>
    `;
}

// Render the comment section with pagination
function renderCommentSectionWithPagination(containerId, uri) {
    const container = document.getElementById(containerId);
    if (!container || !uri) return;

    container.innerHTML = "<p>Loading comments...</p>";

    getPostThread(uri).then((thread) => {
        if (!thread || !thread.replies || thread.replies.length === 0) {
            container.innerHTML = "<p>No comments available</p>";
            return;
        }

        const sortedReplies = thread.replies.sort(sortByLikes);
        const commentsDiv = document.createElement("div");
        const showMoreButton = document.createElement("button");
        let visibleCount = 3;

        const renderReplies = () => {
            commentsDiv.innerHTML = ""; // Clear previous replies
            sortedReplies.slice(0, visibleCount).forEach((reply) => {
                if (!reply.post) return;
                const commentDiv = document.createElement("div");
                commentDiv.className = "comment";

                const authorName = reply.post.author?.displayName || reply.post.author?.handle || "Unknown Author";
                const text = reply.post.record?.text || "No content";

                commentDiv.innerHTML = `
                    <p><strong>${authorName}</strong></p>
                    <p>${text}</p>
                    <div class="actions">
                        ${renderActions(reply.post)}
                    </div>
                `;

                commentsDiv.appendChild(commentDiv);
                renderNestedReplies(reply, commentDiv); // Add nested replies
            });
        };

        renderReplies();

        showMoreButton.textContent = "Show more comments";
        showMoreButton.style.marginTop = "10px";
        showMoreButton.addEventListener("click", () => {
            visibleCount += 5;
            renderReplies();

            if (visibleCount >= sortedReplies.length) {
                showMoreButton.style.display = "none";
            }
        });

        container.innerHTML = ""; // Clear the loading message
        container.appendChild(commentsDiv);
        if (sortedReplies.length > visibleCount) {
            container.appendChild(showMoreButton);
        }
    }).catch((err) => {
        console.error("Error rendering comment section with pagination:", err);
        container.innerHTML = "<p>Error loading comments</p>";
    });
}

// Initialize the comments section if the page has a placeholder
document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.getElementById("comment-section");
    if (commentsContainer) {
        const bskyPostUri = commentsContainer.getAttribute("data-bsky-post-uri");
        if (bskyPostUri) {
            renderCommentSectionWithPagination("comment-section", bskyPostUri);
        }
    }
});
