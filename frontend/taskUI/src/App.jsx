import { BrowserRouter, Routes, Route } from "react-router-dom";

import IssueList from "./features/issues/IssueList";
import BoardPage from "./features/board/BoardPage";
import BacklogPage from "./features/backlog/BacklogPage";
import WorkflowPage from "./features/workflow/WorkflowPage";
import Login from "./features/auth/LoginPage";
import Register from "./features/auth/RegisterPage";
import IssueForm from "./forms/Issueform";
import Dashboard from "./layouts/Dashboard";
import EpicPage from "./features/epic/EpicPage";
import SprintPage from "./features/sprint/SprintPage";
import EpicForm from "./forms/EpicForm";
import SprintForm from "./forms/SprintForm";
import UpdateProfile from "./forms/UpdateProfile";
import UserProfile from "./layouts/UserProfile";
import IssueDetail from "./features/issues/IssueDetail";
import UserList from "./features/users/UserList";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/issues" element={<IssueList />} />
        <Route path="/epics" element={<EpicPage />} />
        <Route path="/epicForm" element={<EpicForm />} />
        <Route path="/sprints" element={<SprintPage />} />
        <Route path="/sprintForm" element={<SprintForm />} />
        <Route path="/issueForm" element={<IssueForm />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/workflow" element={<WorkflowPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/issue/:id" element={<IssueDetail />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
