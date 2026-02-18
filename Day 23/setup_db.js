// setup_db.js
// Connect to the local MongoDB instance
try {
  db = connect("mongodb://localhost:27017/unify_labs");
  print("Connected to database: " + db.getName());
} catch (err) {
  print("Error connecting to database: " + err);
  quit(1);
}

// Create 'interns' collection explicitly (optional in MongoDB as insert creates it, but good for confirmation)
try {
  db.createCollection("interns");
  print("Collection 'interns' created.");
} catch (err) {
  print("Collection 'interns' might already exist or error: " + err);
}

// Prepare sample documents
var internsData = [
  {
    name: "Alice Johnson",
    role: "Frontend Developer Intern",
    joinedDate: new Date("2023-09-01"),
  },
  {
    name: "Bob Smith",
    role: "Backend Developer Intern",
    joinedDate: new Date("2023-09-15"),
  },
  {
    name: "Charlie Brown",
    role: "UI/UX Designer Intern",
    joinedDate: new Date("2023-10-01"),
  },
];

// Insert documents
try {
  var result = db.interns.insertMany(internsData);
  print(
    "Inserted " +
      result.insertedIds.length +
      " documents into columns interns.",
  );
  printAll();
} catch (err) {
  print("Error inserting documents: " + err);
}

function printAll() {
  print("\n--- Current Data in 'interns' Collection ---");
  var cursor = db.interns.find();
  while (cursor.hasNext()) {
    printjson(cursor.next());
  }
}
