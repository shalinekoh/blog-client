import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import useAuth from "./utils/useAuth";

function App() {
  const { isLoggedIn, setIsLoggedIn, handleLogout } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
      >
        <Route index element={<HomePage />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
