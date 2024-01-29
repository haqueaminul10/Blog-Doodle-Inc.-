import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
export default function Login() {
  const navigate = useNavigate();

  const inputData = { user_email: "", password: "" };
  const [formData, setFormData] = useState(inputData);
  const { auth, setAuth } = useContext(AuthContext);
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
      const response = await fetch(`http://localhost:9000/login`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setAuth({ user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate(`/`);
      } else {
        if (response.status === 401 || response.status === 500) {
          alert(data.message);
        } else {
          alert(`Login failed`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form style={{ margin: "100px" }} onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="user_email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
