import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [randomPosts, setRandomPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          setError("Error fetching posts. Please try again.");
        }
        const data = await response.json();
        setPosts(data.posts);
        setRandomPosts(data.randomPosts);
        console.log(randomPosts);
      } catch (error) {
        setError(data.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="dashboard">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <Link style={{ color: "inherit" }} to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <div className="post-info">
                <p> {post.User.username}</p>
                <time>{format(post.createdAt, "MMM dd, yyyy")}</time>
              </div>
              <p>{post.description}</p>
            </div>
            <div className="image-div">
              <Link to={`/post/${post.id}`}>
                {post.image && <img src={post.image} />}
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="todays-pick">
        <h2>Today's pick</h2>
        {randomPosts &&
          randomPosts.map((randomPost) => (
            <div key={randomPost.id}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <defs>
                  <linearGradient
                    id="meteoconsStarFill0"
                    x1="187.9"
                    x2="324.1"
                    y1="138.1"
                    y2="373.9"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#fcd966" />
                    <stop offset=".5" stop-color="#fcd966" />
                    <stop offset="1" stop-color="#fccd34" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#meteoconsStarFill0)"
                  stroke="#fcd34d"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="m105.7 263.5l107.5 29.9a7.9 7.9 0 0 1 5.4 5.4l29.9 107.5a7.8 7.8 0 0 0 15 0l29.9-107.5a7.9 7.9 0 0 1 5.4-5.4l107.5-29.9a7.8 7.8 0 0 0 0-15l-107.5-29.9a7.9 7.9 0 0 1-5.4-5.4l-29.9-107.5a7.8 7.8 0 0 0-15 0l-29.9 107.5a7.9 7.9 0 0 1-5.4 5.4l-107.5 29.9a7.8 7.8 0 0 0 0 15Z"
                >
                  <animateTransform
                    additive="sum"
                    attributeName="transform"
                    calcMode="spline"
                    dur="6s"
                    keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
                    repeatCount="indefinite"
                    type="rotate"
                    values="-15 256 256; 15 256 256; -15 256 256"
                  />
                  <animate
                    attributeName="opacity"
                    dur="6s"
                    values="1; .75; 1; .75; 1; .75; 1"
                  />
                </path>
              </svg>
              <p id="username">{randomPost.User.username}</p>
              <Link to={`/post/${randomPost.id}`}>
                <p id="title">{randomPost.title}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
