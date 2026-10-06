import express from "express";
import cors from "cors";

import healthRouter from "./routes/health.js"
import articlesRouter from "./routes/articles.js";
import tradesRouter from "./routes/trades.js";
import statisticsRouter from "./routes/statistics.js";

export const app = express();

// Set up middleware, act as a bridge for communication between Frontend and Backend
  // Enable React to communicate with the server
    // Normally just the following is enough an app.use(cors())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://trading-journal-2jli.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json());  // Enable the server to parse(read) JSON data from React

// Import routes
  // Allow us to assign a middleware to a specified route
app.use(healthRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/trades', tradesRouter);
app.use('/api/statistics', statisticsRouter);
