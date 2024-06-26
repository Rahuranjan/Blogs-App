import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: null
  });


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputs((prevState) => ({
      ...prevState,
      image: file,
    }));
  };


  const sendRequest = async () => {

    const formdata = new FormData();
    formdata.append('title', inputs.title);
    formdata.append('description', inputs.description);
    formdata.append('user', localStorage.getItem("userId"));
    if (inputs.image) {
      formdata.append('image', inputs.image);
    }
    // 
    const res = await axios
      .post("https://2e83d443-303b-404e-83b2-32ab83a700a2.e1-us-east-azure.choreoapps.dev/blogs/addblog", formdata, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };


  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"60%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>
            Image
          </InputLabel>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            sx={{ mt: 4, borderRadius: 4, padding: 2}}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
