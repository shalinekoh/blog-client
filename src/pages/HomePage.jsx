import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>Welcome to Bits & Bytes.</h1>
        <p>A place to explore, express, and enrich your perspective.</p>
        <Link to="/dashboard" id="home-button">
          Start Reading
        </Link>
      </div>
      <img
        className="home-img"
        src="https://images.unsplash.com/photo-1468779036391-52341f60b55d?q=80&w=2868&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ></img>
    </div>
  );
}

export default HomePage;
