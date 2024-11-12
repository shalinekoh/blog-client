import React from "react";
import { useNavigate } from "react-router-dom";

const DeletePostButton = ({ postId, isUser, token }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Error deleting post.");
      } else {
        alert("Post deleted successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Delete error:", error);
    }
  };

  return (
    <button id="deleteBtn" onClick={handleDelete} disabled={!isUser}>
      Delete
    </button>
  );
};

export default DeletePostButton;
