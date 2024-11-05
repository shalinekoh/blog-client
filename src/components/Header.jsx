import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header({ isLoggedIn, handleLogout }) {
  return (
    <header>
      <Link to="/" className="logo">
        Bits & Bytes
      </Link>

      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </header>
  );
}

export default Header;
