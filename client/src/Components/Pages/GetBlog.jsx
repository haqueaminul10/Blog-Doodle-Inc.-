import React, { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import { AuthContext } from "../Context/AuthContext";
export default function GetBlog({ blog }) {
  const { auth } = useContext(AuthContext);
  const { blog_body, blog_title, comments } = blog;
  const [newComment, setNewComment] = useState("");
  const handleChangeComment = (e) => {
    setNewComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = auth.token;

      const response = await fetch(`http://localhost:9000/comment`, {
        method: `POST`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          blogId: blog.id,
          comment_body: newComment,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log("ok");
        setNewComment("");
      } else {
        if (response.status === 500) {
          alert(data.message);
        } else {
          alert("server error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div class="card" style={{ width: "50rem", margin: "15px auto" }}>
        <div class="card-body">
          <h5 class="card-title">{blog_title}</h5>
          <p class="card-text">{blog_body}</p>
          <h6 class="card-subtitle mb-2 text-body-secondary">Comments:</h6>
          <div>
            {comments && comments.length > 0 ? (
              <>
                {comments.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <Comment comment={comment} />
                    </div>
                  );
                })}
              </>
            ) : (
              <>no comment</>
            )}
          </div>
          <div class="input-group flex-nowrap">
            <input
              type="text"
              class="form-control"
              placeholder="Comment"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              value={newComment}
              onChange={handleChangeComment}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
