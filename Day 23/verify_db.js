// verify_db.js
db = connect("mongodb://localhost:27017/unify_labs");
print("Connected to: " + db.getName());

var count = db.interns.countDocuments();
print("Number of documents in interns collection: " + count);

if (count > 0) {
  print("Sample document:");
  printjson(db.interns.findOne());
} else {
  print("No documents found!");
}
