import './App.css';
import Header from './myComponents/Header.js';
import { Blogs } from './myComponents/blogs.js';
import { Footer } from './myComponents/footer';
import { AddBlog } from './myComponents/AddBlog';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link  
} from "react-router-dom";

function App() {
  let initBlog;
  if (localStorage.getItem("blogs") === null) {
    initBlog = []
  }
  else {
    initBlog = JSON.parse(localStorage.getItem("blogs"));
  }
  const [blogs, setBlogs] = useState(initBlog);
  const addBlog = (title, desc) => {
    let sno;
    let likes = 0;
    if (blogs.length === 0) {
      sno = 0;
    }
    else {
      sno = blogs[blogs.length - 1].sno + 1;
    }
    const myBlog = {
      sno: sno,
      title: title,
      desc: desc,
      likes: likes
    }
    setBlogs([...blogs, myBlog]);
  }
  function onDelete(blog) {
    setBlogs(blogs.filter((e) => {
      return e !== blog
    }));
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);
  return (
    <>
      <Router>
        <div>
          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            {/*<Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>*/}
            <Route path="/"><Header searchbar={false} />
              <AddBlog addBlog={addBlog} />
              <Blogs blogs={blogs} onDelete={onDelete} />
              <Footer />
            </Route>
          </Routes>
        </div>
      </Router>

    </>);
}

export default App;
