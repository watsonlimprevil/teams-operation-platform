import express from "express";
import projectRoutes from "./routes/project.routes";
import taskRoutes from './routes/task.routes'
import teamMembershipRoutes from './routes/teamMembership.routes'
const app = express();
app.use(express.json());
app.use('/tasks' , taskRoutes)
app.use("/projects", projectRoutes);
app.use('/team-membership' , teamMembershipRoutes)

app.listen(3001, () => console.log("Server running on port 3001"));
