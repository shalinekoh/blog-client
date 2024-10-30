import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./Header";

function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default Layout;
