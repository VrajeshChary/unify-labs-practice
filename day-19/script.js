// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    // Create new list item
    const li = document.createElement("li");
    li.className = "task-item";

    // Create span for text (click to toggle completed)
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskText;

    // Add click event listener to toggle completed class
    span.addEventListener("click", function () {
      span.classList.toggle("completed");
    });

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    // Add click event listener to remove item
    deleteBtn.addEventListener("click", function () {
      taskList.removeChild(li);
    });

    // Append elements to li
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Append li to ul
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
    taskInput.focus();
  } else {
    alert("Please enter a task!");
  }
}

// Add event listener for adding tasks
addTaskBtn.addEventListener("click", addTask);

// Allow adding tasks with Enter key
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
