import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        Bits & Bytes
      </Link>
      <nav>
        <Link to="/dashboard" className="nav-link">
          Our story
        </Link>
        <Link to="/signup" className="nav-link">
          Sign up
        </Link>
        <Link to="/login" className="nav-link">
          Log in
        </Link>
      </nav>
    </header>
  );
}

export default Header;
