import React from "react";

export default function Comment({ comment }) {
  const { comment_body, user_email, user_name } = comment;

  return (
    <>
      <div style={{ backgroundColor: "whitesmoke" }}>
        <h6>
          {user_email}{" "}
          <span
            style={{ fontSize: "12px", display: "block", marginLeft: "20px" }}
          >
            {user_name}
          </span>
        </h6>
        <p>{comment_body}</p>
      </div>
    </>
  );
}
