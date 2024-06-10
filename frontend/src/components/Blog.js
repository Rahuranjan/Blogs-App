import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Blog = ({ title, description, imageURL, username, id, isUser }) => {
  const currentDate = new Date();

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  const formattedDate = formatDate(currentDate);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/blogs/deleteblog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  return (
    <div>
      <Card sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc"
        }
      }}>
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader 
          avatar={
            <Avatar sx={{ bgcolor: "red",fontSize: "1.5rem", }} aria-label="recipe">
              {username ? username.charAt(0) : ""}
            </Avatar>
          }

          title= <span style={{ fontSize: "1.5rem"}} >{title}</span>
          // subheader={formattedDate}
        />
        <CardMedia
          component="img"
          height="100%"
          image={imageURL}
          alt="Image Not Found"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "1.5rem"}}>
            <b>{username}</b> {": "}{description}
          </Typography>
        </CardContent>

      </Card>
    </div>
  )
}

export default Blog
