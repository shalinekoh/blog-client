import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match. ");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        // Handle server errors (e.g., username already taken)
        setError(data.errors ? data.errors[0].msg : "Signup failed.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-form">
      <div className="box">
        <form onSubmit={handleSignup}>
          <h2>Join Bits & Bytes.</h2>
          <input
            placeholder="Username"
            type="text"
            required
            minLength="5"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            required
            minLength="8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            required
            minLength="8"
            value={confirmPassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="form-button" type="submit">
            Sign Up
          </button>
          <p>
            Already have an account? <Link to="/login">Log in.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
