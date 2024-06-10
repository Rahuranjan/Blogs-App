import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const res = await axios.get('https://2e83d443-303b-404e-83b2-32ab83a700a2.e1-us-east-azure.choreoapps.dev/blogs').catch(err => console.log(err))

    const data = await res.data;
    return data;
  }

  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs))
  },[])
  console.log(blogs)
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id ={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL = {blog.image}
            username={blog.user.name}
          />
        ))}
    </div>
  )
}

export default Blogs
