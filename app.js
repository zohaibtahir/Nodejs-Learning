const express = require('express');
const { result } = require('lodash');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// database connection string of MongoDB
const dbURI = 'mongodb+srv://zohaib:zohaib@nodelearning.ruf1z.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err) => console.log(err));

// view engine
app.set('view engine' , 'ejs');


// Middleware for static files
app.use(express.static('public'));

// add blog
app.get('/add-blog', (req,res)=>{
    const blog = new Blog({
        title:'Blog title 2',
        sinppet: 'Blog snippet will be here',
        body: 'blog full body text will be here'
    });

    blog.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

// get blogs
app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>console.log(err));
});

// routing
app.get('/',(req,res)=>{
    const blogs = [
        {title: 'Blog Title', snippet: 'The main goal to understand working here.'},
        {title: 'Blog Title', snippet: 'The main goal to understand working here.'},
        {title: 'Blog Title', snippet: 'The main goal to understand working here.'},
    ]
    res.render('index',{blogs});
});
app.get('/about',(req,res)=>{
    res.render('about');
});

// Redirect
app.get('/blog/create',(req,res)=>{
    res.render('create');
});

// 404 error
app.use((req,res)=>{
    res.render('404');
});