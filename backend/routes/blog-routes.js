const express = require('express');
const {getAllBlogs, addBlog, updateBlog, getBlogId, deleteBlog, getByUserId} = require('../controllers/blog-controller.js');
const multer = require('multer');
const upload = multer();

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs) ;
blogRouter.post('/addblog',upload.single('image'), addBlog);
blogRouter.put('/updateblog/:id', updateBlog);
blogRouter.delete('/deleteblog/:id', deleteBlog);
blogRouter.get('/:id', getBlogId);
blogRouter.get('/user/:id', getByUserId);
module.exports = blogRouter;
