import React from "react";
import { Link } from "react-router-dom";

function NavBar({ isLoggedIn, handleLogout }) {
  return (
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
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
