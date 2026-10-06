import { Router } from "express";

const router = Router();

// Set up test route
  // api/health is a common used route to check if server is running
router.get('/health', (req, res) => {
  // Adding the formatted timestamp is a good practice for debugging
  res.status(200).json({ 
    status: "ok",
    message: "Server is running correctly",
    timestamp: new Date().toLocaleString() // ie: 4/19/2026, 3:09:40 PM
  });
});
export default router;