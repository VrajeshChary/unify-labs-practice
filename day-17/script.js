// Day 17 - Data Logic App
// Implementation of filter, map, and reduce for student projects

// 1. Define mock database of student projects
const projects = [
  {
    id: 1,
    description: "Build a Website",
    status: "Completed",
    price: 500,
    expense: 100,
  },
  {
    id: 2,
    description: "Design a Logo",
    status: "Pending",
    price: 150,
    expense: 20,
  },
  {
    id: 3,
    description: "Create a Mobile App",
    status: "In Progress",
    price: 1200,
    expense: 300,
  }, // Treated as Pending for this exercise? Or strictly 'Pending'
  {
    id: 4,
    description: "Write Content",
    status: "Pending",
    price: 200,
    expense: 50,
  },
  {
    id: 5,
    description: "SEO Optimization",
    status: "Completed",
    price: 400,
    expense: 80,
  },
];

console.log("Original Projects:", projects);

// 2. Filter a list of tasks into 'Completed' and 'Pending'
const completedProjects = projects.filter(
  (project) => project.status === "Completed",
);
const pendingProjects = projects.filter(
  (project) => project.status === "Pending",
);

console.log("Completed Projects:", completedProjects);
console.log("Pending Projects:", pendingProjects);

// 3. Map over user prices to calculate them with tax added (assuming 10% tax)
const projectsWithTax = projects.map((project) => {
  return {
    ...project,
    priceWithTax: project.price * 1.1,
  };
});

console.log("Projects with 10% Tax:", projectsWithTax);

// 4. Reduce a list of expense amounts into a total company budget
const totalBudget = projects.reduce(
  (total, project) => total + project.expense,
  0,
);

console.log("Total Company Budget (Expenses):", totalBudget);

// Display results on the page for visual verification
if (typeof document !== "undefined") {
  const outputDiv = document.getElementById("output");
  if (outputDiv) {
    outputDiv.innerHTML = `
            <h3>Results:</h3>
            <p><strong>Completed Projects Count:</strong> ${completedProjects.length}</p>
            <p><strong>Pending Projects Count:</strong> ${pendingProjects.length}</p>
            <p><strong>Total Budget (Expenses):</strong> $${totalBudget}</p>
            <p><em>Check console for full details.</em></p>
        `;
  }
}
