import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
  const dispatch = useDispatch(); 
  // const isLoggedIn = useSelector(state => state.isLoggedIn)
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [value, setValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Update the tab value based on the current path
    if (location.pathname === '/blogs') {
      setValue(0);
    } else if (location.pathname === '/myBlogs') {
      setValue(1);
    } else if (location.pathname === '/blogs/add') {
      setValue(2);
    }
  }, [location.pathname]);

  
  console.log(isLoggedIn)
  return (
    <AppBar position='sticky' >
      <Toolbar>
        <Typography variant='h4'>
          BlogApp
        </Typography>
        {
          isLoggedIn && 
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val)} >
              <Tab  LinkComponent={Link} to="/blogs"  label="All Blogs" />
              <Tab  LinkComponent={Link} to="/myBlogs" label="My Blogs" />
              <Tab  LinkComponent={Link} to="/blogs/add" label="Add Blog" />
          </Tabs>
        </Box>
        }
        
        <Box variant='h4' display="flex" marginLeft="auto">
          {!isLoggedIn && 
          <>
            <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin: 1, borderRadius: 10}} color='warning'>Login</Button>
            <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin: 1, borderRadius: 10}} color='warning'>Signup</Button>
          </>
          }
          
          { 
          isLoggedIn && (
          <Button 
            onClick={() => {
              dispatch(authActions.logout());
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("userId");
            }}
            LinkComponent={Link} 
            to="/auth" 
            variant='contained' 
            sx={{margin: 1, borderRadius: 10}} 
            color='warning'
          >
            LogOut
          </Button>
        )}
          
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
