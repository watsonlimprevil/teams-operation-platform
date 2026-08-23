import express from "express";
import projectRoutes from "./routes/project.routes";

const app = express();
app.use(express.json());

app.use("/projects", projectRoutes);

app.listen(3001, () => console.log("Server running on port 3001"));
