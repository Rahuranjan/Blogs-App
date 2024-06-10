import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios.post(`https://2e83d443-303b-404e-83b2-32ab83a700a2.e1-us-east-azure.choreoapps.dev/users/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => {
      setError(err.response?.data?.message || 'Something went wrong');
      setOpen(true);
    
    })

    const data = await res.data;
    return data;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(isSignup) {
      sendRequest('signup')
      .then((data) =>{ 
        localStorage.setItem("userId", data.user._id)
        localStorage.setItem("isLoggedIn", true)
      })
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/blogs"))
      .then(data => console.log(data))
    } else {
      sendRequest('login')
      .then((data) =>{ 
        localStorage.setItem("userId", data.user._id)
        localStorage.setItem("isLoggedIn", true)
      })
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/blogs"))
      .then(data => console.log(data))
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box 
          maxWidth="400px" 
          display='flex' 
          flexDirection='column' 
          justifyContent='center' 
          alignItems='center' 
          boxShadow="10px 10px 20px #ccc" 
          padding={3} 
          borderRadius={5} 
          marginTop={5} 
          margin="auto">
          <Typography 
            padding={3} 
            textAlign='center' 
            variant='h2'> 
              {isSignup ? "Signup" : "Login"} 
          </Typography>

          {
          isSignup && 
            <TextField 
              name="name" 
              onChange={handleChange} 
              value={inputs.name} 
              placeholder='Name' 
              margin="normal" 
              />
            }

          <TextField 
            onChange={handleChange}
            name='email' 
            type={"email"} 
            value={inputs.email} 
            placeholder='Email' 
            margin="normal" 
          />

          <TextField 
            onChange={handleChange} 
            name='password'
            type={"password"} 
            value={inputs.password} 
            placeholder='Password' 
            margin="normal" 
          />

          <Button 
            varient="contained" 
            sx={{ borderRadius: 3, marginTop: 3 }} 
            color='warning'
            type='submit' 
            >
              Submit
            </Button>
          <Button 
            sx={{ borderRadius: 3, marginTop: 3 }} 
            onClick={() => setIsSignup(!isSignup)} 
            >
              Change to {isSignup ? "Login" : "Signup"}
            </Button>
        </Box>

        
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Auth 
