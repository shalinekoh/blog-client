import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

function NewPostPage({ isLoggedIn }) {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (img) {
      formData.append("fileupload", img);
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) {
        setError(response.message);
      } else {
        console.log(result);
        setTitle("");
        setContent("");
        setImg(null);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An error occured. Please try again. ");
    }
  };

  return (
    <div className="newpost-container">
      {isLoggedIn ? (
        <form className="newpost-form" onSubmit={handleSubmit}>
          <h2>Create New Post</h2>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            placeholder="Upload your image"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <Editor
            apiKey="fula1oja2qjnha6ze6vmo0sc4owj4xawajoftuns2ublwezt"
            value={content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "image",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(e) => setContent(e)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in first.</p>
      )}
    </div>
  );
}

export default NewPostPage;
