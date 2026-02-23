async function loadPosts() {
  const res = await fetch("/api/posts");
  const posts = await res.json();

  const container = document.getElementById("blog-container");
  let output = "";

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    output += `
            <div class="post-card">
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <span>By ${post.author || "Anonymous"}</span>
                <button onclick="deletePost('${post._id}')">Delete</button>
            </div>
        `;
  }

  container.innerHTML = output;
}

async function addPost() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;

  if (title == "" || content == "") {
    alert("Please complete all boxes");
    return;
  }

  const newPost = {
    title: title,
    author: author,
    content: content,
  };

  await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("content").value = "";

  loadPosts();
}

async function deletePost(id) {
  await fetch("/api/posts/" + id, {
    method: "DELETE",
  });

  loadPosts();
}

window.onload = loadPosts;
