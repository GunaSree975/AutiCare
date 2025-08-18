# Game App Backend

This is the backend for the Game App, built with Express and MongoDB.

## Features
- User authentication (to be implemented)
- Stores user game statistics, rewards, achievements, and progress
- RESTful API endpoints for reading and updating user data

## Setup

1. **Install dependencies:**
   ```
   npm install
   ```
2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and update values as needed.

3. **Start MongoDB:**
   - Make sure MongoDB is running locally or update `MONGO_URI` in `.env` for your setup.

4. **Run the server:**
   - For development with auto-reload:
     ```
     npm run dev
     ```
   - For production:
     ```
     npm start
     ```

## Folder Structure
- `index.js` - Entry point for the Express server
- `models.js` - Mongoose schemas and models

## API Endpoints
- `GET /` - Health check
- (To be added) Endpoints for users, stats, rewards, achievements, and progress

## License
MIT