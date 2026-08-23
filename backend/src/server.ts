import express from "express";
import projectRoutes from "./routes/project.routes";
import taskRoutes from './routes/task.routes'
import teamMembershipRoutes from './routes/teamMembership.routes'
import authRoutes from './routes/auth.routes';
import { errorMiddleware } from "./middleware/error.middleware";
const app = express();
app.use(express.json());
app.use('/tasks' , taskRoutes)
app.use("/projects", projectRoutes);
app.use('/team-membership' , teamMembershipRoutes)
app.use('/auth' , authRoutes);
app.use(errorMiddleware);

app.listen(3001, () => console.log("Server running on port 3001"));
