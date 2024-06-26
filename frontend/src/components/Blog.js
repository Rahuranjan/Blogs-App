import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Blog = ({ title, description, imageURL, username, id, isUser }) => {


  const navigate = useNavigate();


  const handleEdit = () => {

    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = useCallback(async () => {
    const res = await axios
      .delete(`https://2e83d443-303b-404e-83b2-32ab83a700a2.e1-us-east-azure.choreoapps.dev/blogs/deleteblog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }, [id]);

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs")).then(() => window.location.reload());

    alert("Blog Deleted Successfully")
  };

  return (
    <div>
      <Card sx={{
        width: "30%",
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
            <Avatar sx={{ bgcolor: "red", fontSize: "1.5rem", }} aria-label="recipe">
              {username ? username.charAt(0) : ""}
            </Avatar>
          }

          title=<span style={{ fontSize: "1.5rem" }} >{title}</span>
        // subheader={formattedDate}
        />
        <CardMedia
          component="img"
          height="375px"
          image={imageURL}
          alt="Image Not Found"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            objectFit: 'contain',
            margin: 'auto'
          }}
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary" >
            <b>{username}</b> {": "}{description}
          </Typography>
        </CardContent>

      </Card>
    </div>
  )
}

export default Blog
