import React, { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:9000/blogs`);
      const data = await response.json();
      //console.log(data);
      setBlogs(data);
    };
    fetchData();
  }, []);
  return (
    <PostContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
