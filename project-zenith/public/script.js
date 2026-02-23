// Theme Logic
function toggleTheme() {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    document.getElementById("themeBtn").innerText = "🌙 Dark Mode";
  } else {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("themeBtn").innerText = "☀️ Light Mode";
  }
}

// Check local storage on load
if (localStorage.getItem("theme") === "dark") {
  document.body.setAttribute("data-theme", "dark");
  document.getElementById("themeBtn").innerText = "☀️ Light Mode";
}

async function loadPosts() {
  const res = await fetch("/api/posts");
  const posts = await res.json();
  const container = document.getElementById("blog-container");

  container.innerHTML = posts
    .map(
      (post) => `
    <div class="post-card">
        <span class="category">${post.category || "General"}</span>
        <h2 onclick="viewPost('${post._id}')">${post.title}</h2>
        <p>${post.content.substring(0, 100)}${post.content.length > 100 ? "..." : ""}</p>
        <span class="post-meta">By ${post.author || "Anonymous"} • ${new Date(post.date).toLocaleDateString()}</span>
        <div class="actions">
          <button class="btn-edit" onclick="openEditModal('${post._id}')">Edit</button>
          <button class="btn-delete" onclick="deletePost('${post._id}')">Delete</button>
        </div>
    </div>
  `,
    )
    .join("");
}

async function addPost() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;

  if (!title || !content) return alert("Please complete required boxes");

  await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, category, content }),
  });

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("content").value = "";
  loadPosts();
}

async function deletePost(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    await fetch("/api/posts/" + id, { method: "DELETE" });
    loadPosts();
  }
}

// ==== Modal Logic ====
function closeModal() {
  document.getElementById("postModal").classList.remove("active");
}

async function viewPost(id) {
  const res = await fetch(`/api/posts/${id}`);
  const post = await res.json();

  document.getElementById("postModal").innerHTML = `
    <div class="modal active">
      <button class="close-modal" onclick="closeModal()">×</button>
      <span class="category">${post.category || "General"}</span>
      <h2 style="margin-bottom: 5px;">${post.title}</h2>
      <span class="post-meta" style="display:block; margin-bottom: 20px;">By ${post.author || "Anonymous"} • ${new Date(post.date).toLocaleDateString()}</span>
      <p style="white-space: pre-wrap; line-height: 1.6;">${post.content}</p>
    </div>
  `;
  document.getElementById("postModal").classList.add("active");
}

async function openEditModal(id) {
  const res = await fetch(`/api/posts/${id}`);
  const post = await res.json();

  document.getElementById("postModal").innerHTML = `
    <div class="modal active">
      <button class="close-modal" onclick="closeModal()">×</button>
      <h2 style="margin-bottom: 20px;">Edit Post</h2>
      <div class="form-section" style="box-shadow:none; padding:0; margin:0; border:none;">
        <input type="text" id="edit-title" value="${post.title}">
        <input type="text" id="edit-author" value="${post.author || ""}">
        <select id="edit-category">
          <option value="General" ${post.category === "General" ? "selected" : ""}>General</option>
          <option value="Technology" ${post.category === "Technology" ? "selected" : ""}>Technology</option>
          <option value="Lifestyle" ${post.category === "Lifestyle" ? "selected" : ""}>Lifestyle</option>
          <option value="Programming" ${post.category === "Programming" ? "selected" : ""}>Programming</option>
        </select>
        <textarea id="edit-content" rows="6">${post.content}</textarea>
        <button class="primary" onclick="saveEdit('${id}')">Save Changes</button>
      </div>
    </div>
  `;
  document.getElementById("postModal").classList.add("active");
}

async function saveEdit(id) {
  const title = document.getElementById("edit-title").value;
  const author = document.getElementById("edit-author").value;
  const category = document.getElementById("edit-category").value;
  const content = document.getElementById("edit-content").value;

  await fetch(`/api/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, category, content }),
  });

  closeModal();
  loadPosts();
}

window.onload = loadPosts;
