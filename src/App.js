import "./App.css";
import { Route, Routes, HashRouter } from "react-router-dom";
import { createHashHistory } from "history";
import Home from "./pages/home";
import Register from "./pages/register";
function App() {
  return (
    <HashRouter basename="/" history={createHashHistory}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
