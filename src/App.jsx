import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/signup" element={<div>Sign up</div>} />
        <Route path="/login" element={<div>Log in</div>} />
      </Route>
    </Routes>
  );
}

export default App;
