import React from "react";
import { Link } from "react-router-dom";

function NavBar({ isLoggedIn, handleLogout }) {
  const username = localStorage.getItem("username");
  return (
    <nav>
      {isLoggedIn ? (
        <div>
          <p>
            Welcome back,{" "}
            <Link id="user-link" to={`/profile/${username}`}>
              {username}
            </Link>
          </p>

          <Link to="/create-post" className="nav-link">
            Create post
          </Link>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <Link to="/dashboard" className="nav-link">
            Our story
          </Link>
          <Link to="/signup" className="nav-link">
            Sign up
          </Link>
          <Link to="/login" className="nav-link">
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
