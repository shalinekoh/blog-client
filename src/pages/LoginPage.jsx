import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        // navigate to dashboard for now
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h2>Welcome back.</h2>
          <input
            placeholder="Username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="form-button" type="submit">
            Log In
          </button>
          <p>
            No account? <Link to="/signup">Sign up.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
