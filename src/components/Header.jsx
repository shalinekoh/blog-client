import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header({ isLoggedIn, handleLogout }) {
  const navigateDest = isLoggedIn ? "/dashboard" : "/";
  return (
    <header>
      <Link to={navigateDest} className="logo">
        Bits & Bytes
      </Link>

      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </header>
  );
}

export default Header;
