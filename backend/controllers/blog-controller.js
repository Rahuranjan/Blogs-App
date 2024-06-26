const { default: mongoose } = require('mongoose');
const Blog = require('../model/Blog.js');
const User = require('../model/User.js');
const ImageKit = require("imagekit");


const imagekit = new ImageKit({
    publicKey : "public_PxFSEdLkJHrQEvnT1ZOk8gS74WA=",
    privateKey : "private_C5di7uripkauX4iczpv6kXrnG4s=",
    urlEndpoint : "https://ik.imagekit.io/lwmj8ey7f"
  });


const getAllBlogs = async (req, res) => {
    let blogs;
    try {
        blogs = await Blog.find({}).populate('user');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (!blogs) {
        return res.status(404).json({ message: 'No blogs found' });
    }
    return res.status(200).json({ blogs });
};

// Function to upload a single file to ImageKit
const uploadToImageKit = (file) => {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file.buffer, // Use buffer instead of file stream
            fileName: `${file.originalname}`, // Keep original name
        }, (error, result) => {
            if (error) {
                console.error('ImageKit upload error:', error);
                return reject(error);
            }
            resolve(result.url); // Store the URL in the local array once uploaded
            console.log("image url are:", result.url);
        });
    });
};

const addBlog = async (req, res) => {
    const { title, description, user } = req.body;
    const { file } = req;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    let imageUrl;
    try {
        imageUrl = await uploadToImageKit(file); // Upload image and get URL
    } catch (err) {
        return res.status(500).json({ message: 'Image upload failed' });
    }

    const blog = new Blog({
        title,
        description,
        image: imageUrl,
        user,
    });

    try {
     const session  = await mongoose.startSession();
     session.startTransaction();
     await blog.save({ session });
     existingUser.blogs.push(blog);
     await existingUser.save({ session });
     await session.commitTransaction();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    return res.status(201).json({ blog });
}

const updateBlog = async (req, res) => {
    const {title, description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {title, description})
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    if (!blog) {
        return res.status(500).json({ message: 'Blog not found' });
    }
    return res.status(200).json({ blog });
}

const getBlogId = async (req, res) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json({ blog });
}

const deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    let blog;
    try {

        blog = await Blog.findByIdAndDelete(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json({ message: 'Blog deleted successfully' });
}

const getByUserId = async (req, res) => {
    const userId = req.params.id;
    let userBlogs;
    try {
       userBlogs = await User.findById(userId).populate('blogs');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    if (!userBlogs) {
        return res.status(404).json({ message: 'No blogs found' });
    }
    return res.status(200).json({ user: userBlogs });
}
module.exports = { getAllBlogs , addBlog, updateBlog, getBlogId, deleteBlog, getByUserId};