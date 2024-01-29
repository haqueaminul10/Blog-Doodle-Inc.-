import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function CreateBlog() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputData = {
    blog_title: "",
    blog_body: "",
  };
  const [formData, setFormData] = useState(inputData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = auth.token;
      console.log(token);
      console.log(formData);
      const response = await fetch(`http://localhost:9000/blog`, {
        method: `POST`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("New blog created");
        navigate("/");
      } else if (response.status === 500) {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form style={{ margin: "100px" }} onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="blog_title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="blog_title"
            name="blog_title"
            value={formData.blog_title}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>

        <div class="mb-3">
          <label htmlFor="blog_body" className="form-label">
            Body
          </label>
          <input
            type="text"
            className="form-control"
            id="blog_body"
            name="blog_body"
            value={formData.blog_body}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
