import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dbURL from "./src/config/db.config.js";
import http from "http"; // For creating HTTP server
import { initializeSocket } from "./src/config/socket.js"; // Import socket config

import userAuthRoutes from "./src/routes/v1/userAuth.routes.js";
import userRoutes from "./src/routes/v1/user.routes.js";
import testRoutes from "./src/routes/v1/test.routes.js";
import userListsRoutes from "./src/routes/v1/userLists.routes.js";
import mediaRoutes from "./src/routes/v1/media.routes.js";
import chatRoutes from "./src/routes/v1/chat.routes.js";
import postRoutes from "./src/routes/v1/post.routes.js";

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server

// Initialize Socket.IO
initializeSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth/", userAuthRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/list", userListsRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}! 🚀`);
});

mongoose.connect(dbURL)
.then(() => {
    console.log("Successfully connected to MongoDB Atlas");
})
.catch(err => {
    console.log("Could not connect to MongoDB Atlas. Exiting now...", err);
    process.exit();
});

