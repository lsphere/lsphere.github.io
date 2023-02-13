import "./App.css";
import { Route, Routes, HashRouter } from "react-router-dom";
import { createHashHistory } from "history";
import Home from "./pages/home";
import Authentication from "./pages/auth";
import Dashboard from "./pages/admin/dashboard";
import AdminLayout from "./components/dashboard/admin-layout";
import UserProfile from "./pages/admin/user-profile";
import CodeEditor from "./pages/admin/code-editor";
import Assignment from "./pages/admin/assignment";
import Quizzes from "./pages/admin/quizzes";
import ForgetPassword from "./pages/forget-password";
import QuizQuestions from "./pages/admin/quiz-questions";

function App() {
  return (
    <HashRouter basename="/" history={createHashHistory}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Authentication />} />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/user-profile" element={<UserProfile />} />
        <Route exact path="/admin/assignment" element={<Assignment />} />
        <Route exact path="/admin/code-editor/:type/" element={<CodeEditor />} />
        <Route exact path="/admin/quizzes" element={<Quizzes />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/admin/quiz-questions" element={<QuizQuestions />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
