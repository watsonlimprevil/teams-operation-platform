import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Teams from "../pages/Teams";
import TeamDetails from "../pages/TeamDetails";
import ProjectDetails from "../pages/ProjectDetails";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import TaskDetails from "../pages/TasksDetails";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks/:taskId" element={<TaskDetails />}></Route>
        <Route path="/tasks" element={<Tasks/>}></Route>
        <Route path="/projects" element={<Projects/>}></Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teams" element={<Teams/>}/>
        <Route path="/teams/:teamId" element={<TeamDetails />}/>
        <Route path="/projects/:projectId" element={<ProjectDetails />}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
