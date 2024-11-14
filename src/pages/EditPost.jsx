import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PostEditor from "../components/PostEditor";

const EditPost = ({ isLoggedIn, isUser }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && isUser) {
      const fetchPost = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/post/${id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) {
            setError(response.message);
          } else {
            const result = await response.json();
            setPost(result);
            setTitle(result.title);
            setImg(result.image);
            setContent(result.content);
            setDescription(result.description);
          }
        } catch (error) {
          setError("An error occured, please try again. ");
        }
      };
      fetchPost();
    } else {
      setError("Unauthorised to edit this post. ");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (img) {
      // Only append if a new file is selected
      formData.append("fileupload", img);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Error updating post.");
      } else {
        setError("");
        alert("Post updated successfully!");
        navigate(`/post/${post.id}`);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (!post) return <p>{error}</p>;
  return (
    <PostEditor
      isLoggedIn={isLoggedIn}
      pageTitle="Edit Post"
      title={title}
      setTitle={setTitle}
      img={img}
      setImg={setImg}
      content={content}
      setContent={setContent}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default EditPost;
