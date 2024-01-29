import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import GetBlog from "./GetBlog";

export default function Home() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { blogs, setBlogs } = useContext(PostContext);
  console.log(blogs);

  return (
    <>
      {auth.user ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              class="btn btn-warning m-4"
              onClick={() => navigate(`/c_post`)}
            >
              Add Post
            </button>
          </div>
          <div>
            {blogs.map((blog) => {
              return <GetBlog key={blog.id} blog={blog} />;
            })}
          </div>
        </>
      ) : (
        <>home</>
      )}
    </>
  );
}
