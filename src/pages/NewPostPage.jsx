import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostEditor from "../components/PostEditor";

function NewPostPage({ isLoggedIn }) {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (img) {
      formData.append("fileupload", img);
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) {
        setError(response.message);
      } else {
        setTitle("");
        setContent("");
        setDescription("");
        setImg(null);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An error occured. Please try again. ");
    }
  };

  return (
    <PostEditor
      isLoggedIn={isLoggedIn}
      pageTitle="Create New Post"
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
}

export default NewPostPage;
