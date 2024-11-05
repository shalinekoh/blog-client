import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./Header";

function Layout({ isLoggedIn, handleLogout }) {
  return (
    <main>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Outlet />
      <Footer />
    </main>
  );
}

export default Layout;
