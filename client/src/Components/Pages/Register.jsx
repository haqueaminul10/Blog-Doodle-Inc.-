import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const inputData = {
    user_name: "",
    user_email: "",
    contact_number: "",
    password: "",
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
      console.log(formData);
      const response = await fetch(`http://localhost:9000/register`, {
        method: `POST`,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
      } else if (response.status === 500) {
        alert(data.message);
      } else {
        alert("Registation error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form style={{ margin: "100px" }} onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="user_name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>

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
          <label htmlFor="contact_number" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            id="contact_number"
            name="contact_number"
            value={formData.contact_number}
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
