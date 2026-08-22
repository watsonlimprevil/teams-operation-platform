import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.Routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
