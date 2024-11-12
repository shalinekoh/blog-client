import { Editor } from "@tinymce/tinymce-react";

const PostEditor = ({
  isLoggedIn,
  pageTitle,
  title,
  setTitle,
  img,
  setImg,
  content,
  setContent,
  description,
  setDescription,
  handleSubmit,
  error,
}) => {
  return (
    <div className="newpost-container">
      {isLoggedIn ? (
        <form className="newpost-form" onSubmit={handleSubmit}>
          <h2>{pageTitle}</h2>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Post Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <p style={{ color: "red", textAlign: "center" }}>
          Please log in first.
        </p>
      )}
    </div>
  );
};

export default PostEditor;
