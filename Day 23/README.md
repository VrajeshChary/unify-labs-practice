# Day 23 - MongoDB Foundation

This project establishes the local data environment using MongoDB.

## Project Structure

- `setup_db.js`: MongoDB Shell script to create the database, collection, and insert sample data.
- `README.md`: This file.

## Setup Instructions

1.  **Install Prerequisites**:
    - MongoDB Community Server
    - MongoDB Compass
    - MongoDB Shell (`mongosh`)

2.  **Verify Installation**:
    Open a terminal and run:

    ```bash
    mongosh --version
    ```

3.  **Create Data**:
    Run the setup script using `mongosh`:

    ```bash
    mongosh "setup_db.js"
    ```

4.  **Verify with MongoDB Compass**:
    - Open MongoDB Compass.
    - Connect to `mongodb://localhost:27017`.
    - Find the `unify_labs` database in the left sidebar.
    - Click on the `interns` collection.
    - You should see the 3 inserted documents.

## Submission Screenshots

Please take screenshots of the following for your submission:

1.  **Terminal Version Check**: check `mongosh --version` output.
    - _Purpose_: Proves MongoDB Shell is installed and working.

2.  **Compass Connection**: The "My Connections" screen or the main dashboard showing you are connected to `localhost:27017`.
    - _Purpose_: Verifies local server connection.

3.  **Database & Collection in Compass**: The `unify_labs` database expanded to show the `interns` collection in the sidebar.
    - _Purpose_: Shows the database and collection were created.

4.  **Documents View**: The main view in Compass showing the 3 inserted documents (Alice, Bob, Charlie) with their fields (`name`, `role`, `joinedDate`).
    - _Purpose_: Validates data insertion.
