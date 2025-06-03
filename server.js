import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3001; // Port for the mock API server

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// POST /api/chat/start
app.post("/api/chat/start", (req, res) => {
  const { name, email, organisation, position } = req.body;
  console.log("Mock /api/chat/start hit with data:", req.body);

  if (name && email && organisation && position) {
    const userId = `mock-user-${Date.now()}`;
    console.log("Returning mock userId:", userId);
    res.json({ userId });
  } else {
    console.log("Missing required fields for /api/chat/start");
    res.status(400).json({ error: "Missing required fields", userId: null });
  }
});

// POST /api/chat/message
app.post("/api/chat/message", (req, res) => {
  const { userId, message } = req.body;
  console.log("Mock /api/chat/message hit with data:", req.body);

  if (!userId || typeof message === "undefined") {
    console.log("Missing userId or message for /api/chat/message");
    return res.status(400).json({ error: "Missing userId or message" });
  }

  // Simulate some AI logic based on the message
  let aiResponse = `Received your message: "${message}". Thanks, ${userId}!`;
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    aiResponse = `Hello ${userId}! How can I assist you today?`;
  } else if (message.toLowerCase().includes("nebula")) {
    aiResponse = "Nebula is an amazing individual with a diverse skill set!";
  } else if (message.toLowerCase().includes("cv") || message.toLowerCase().includes("resume")) {
    aiResponse = "You can download Nebula's CV from the sidebar link!";
  } else if (message.toLowerCase().includes("contact")) {
    aiResponse = "You can find Nebula's contact information on the Contact page.";
  }

  console.log("Returning mock AI response:", aiResponse);
  res.json({ response: aiResponse });
});

app.listen(port, () => {
  console.log(`Mock API server listening at http://localhost:${port}`);
});
