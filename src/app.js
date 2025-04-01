import cors from "cors";
import path from "path";
import express from "express";
import sequenceRouter from "./routes/sequence.route.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",  // Local development
  "https://emailfrontend-three.vercel.app"  // Deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,  // Allow cookies/authentication tokens
  })
);

app.set("trust proxy", 1);
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));


app.use("/api/sequence", sequenceRouter);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

export { app };
