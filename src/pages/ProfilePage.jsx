import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import DeletePostButton from "../components/DeletePostButton";

function Profile({ isLoggedIn, isUser, setIsUser }) {
  const { username } = useParams();
  const [error, setError] = useState("");
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    if (isLoggedIn && username === localStorage.getItem("username")) {
      setIsUser(true);
      const fetchUserPosts = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/profile/${localStorage.getItem("userId")}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            setError("Error fetching posts. Please try again. ");
          }
          const data = await response.json();
          setUserPosts(data);
        } catch (error) {
          setError(error);
        }
      };
      fetchUserPosts();
    } else {
      setError("Unauthorised to access this profile. ");
    }
  }, []);

  if (!userPosts) return <p style={{ textAlign: "center" }}>No user posts.</p>;

  return (
    <div className="profile">
      <h2>My Posts</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isUser && (
        <div className="list">
          {userPosts.map((userPost) => (
            <div className="list-items">
              <Link to={`/post/${userPost.id}`}>
                <p id="profile-title">{userPost.title}</p>
              </Link>
              <time>{format(userPost.createdAt, "MMM dd, yyyy")}</time>
              <div className="buttons">
                <Link id="editBtn" to={`/edit/${userPost.id}`}>
                  <button type="button">Edit</button>
                </Link>
                <Link>
                  <DeletePostButton
                    postId={userPost.id}
                    isUser={isUser}
                    token={localStorage.getItem("token")}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
