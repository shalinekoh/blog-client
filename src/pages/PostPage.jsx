import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";

function Post() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/post/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          setError("Error fetching post. Please try again. ");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(response.message);
      }
    };
    fetchPost(id);
  }, [id]);

  // post starts as null, this line is essential!!
  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-page">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h1>{post.title}</h1>
      <p className="description">{post.description}</p>
      <div className="post-page-info">
        <div className="user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10s10-4.579 10-10S17.421 2 12 2m0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3m-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228"
            />
          </svg>
          <p className="username">{post.User.username}</p>
        </div>
        <time>Published on {format(post.createdAt, "MMM dd, yyyy")}</time>
      </div>
      <img src={post.image}></img>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

export default Post;
