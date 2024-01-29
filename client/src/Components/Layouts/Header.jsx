import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    alert(`logout successfully`);
    navigate(`/login`);
  };

  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Blog
          </a>
          <form class="d-flex" role="search">
            {auth.user ? (
              <div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle mx-5"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user.user_name}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item">profile</a>
                    </li>

                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <button
                  class="btn btn-outline-success mx-3"
                  type="submit"
                  onClick={() => navigate(`/register`)}
                >
                  Register
                </button>
                <button
                  class="btn btn-outline-primary mx-3"
                  type="submit"
                  onClick={() => navigate(`/login`)}
                >
                  Login
                </button>
              </>
            )}
          </form>
        </div>
      </nav>
    </>
  );
}
