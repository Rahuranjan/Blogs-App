import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const UserBlogs = () => {
  const [user, setUser] = useState();

  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios.get(`https://2e83d443-303b-404e-83b2-32ab83a700a2.e1-us-east-azure.choreoapps.dev/blogs/user/${id}`).catch(err => console.log(err))

    const data = await res.data;
    return data;
  }
  // console.log("data are",data.user)
  useEffect(() => {
    sendRequest().then(data => setUser(data.user) )
  },[])
  console.log("user blogs", user)
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  )
}

export default UserBlogs
