const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', router);
app.use('/blogs', blogRouter);

mongoose.connect('mongodb+srv://rahuranjan3455:ahu6fVyAWKjMWOhP@cluster0.mjhhkd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => app.listen(5000)).then(() => { console.log('Server is running on port 5000') }).catch((err) => console.log(err));

app.get('/', (req, res) => { res.send('Hello World!') });





