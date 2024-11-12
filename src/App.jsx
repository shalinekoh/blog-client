import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NewPostPage from "./pages/NewPostPage";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./pages/PostPage";
import Profile from "./pages/ProfilePage";
import EditPost from "./pages/EditPost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
      >
        <Route index element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post/:id" element={<Post />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/create-post"
          element={<NewPostPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/profile/:username"
          element={
            <Profile
              isLoggedIn={isLoggedIn}
              isUser={isUser}
              setIsUser={setIsUser}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={<EditPost isLoggedIn={isLoggedIn} isUser={isUser} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
