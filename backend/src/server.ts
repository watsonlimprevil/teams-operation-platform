import express from "express";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";
import teamMembershipRoutes from "./routes/teamMembership.routes";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import dasboardRoutes from "./routes/dashboard.routes";
import userRouter from "./routes/user.Routes";
import teamRoutes from "./routes/team.routes";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);
app.use("/team-membership", teamMembershipRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dasboardRoutes);
app.use("/teams", teamRoutes);
app.use("/users", userRouter);
app.use(errorMiddleware);

app.listen(3001, () => console.log("Server running on port 3001"));
