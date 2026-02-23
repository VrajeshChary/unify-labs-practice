# Project Zenith 🚀

A full-stack blog CMS application built with Node.js, Express, MongoDB Atlas, and Vanilla HTML/CSS/JS.

## Features

- **Monolith Architecture**: Express serves both the backend API and frontend static files.
- **MongoDB Atlas Integration**: Connects to a live Cloud Database for persistent storage.
- **CRUD Operations**: Fetch and display blog posts, create new posts, and delete them.
- **Dynamic Frontend**: Vanilla JavaScript fetches data from the backend to dynamically render the UI.

## File Structure

- `public/` - Contains the frontend (`index.html`, `style.css`, `script.js`).
- `server.js` - The Express backend application and API routes.
- `.env` - Environment variables (MongoDB Connection URI and Port).
- `package.json` - Node.js dependencies (`express`, `mongodb`, `dotenv`).
- `vercel.json` - Configuration for deploying as serverless functions on Vercel.

## Running Locally

1. Run `npm install` to install dependencies.
2. Ensure you have your MongoDB Atlas URI mapped to `MONGO_URI` in an `.env` file.
3. Run `npm start` to run the active server at `http://localhost:3000`.

## Deployment

This project is configured for cloud deployment on Vercel. Imported directly from GitHub, Vercel will install dependencies and serve the `server.js` routing logic automatically.
