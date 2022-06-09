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

app.use(express.urlencoded({extended:true}));
// view engine
app.set('view engine' , 'ejs');


// Middleware for static files
app.use(express.static('public'));

// routing
app.get('/',(req,res)=>{
    res.redirect('/blogs');
});
app.get('/about',(req,res)=>{
    res.render('about');
});


// blogs routes
app.get('/blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render('index',{blogs:result});
    })
    .catch((err)=>{
        console.log(err);
    })
});

// Redirect
app.get('/blog/create',(req,res)=>{
    res.render('create');
});
// post the blog
app.post('/posts',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })
});

// Single blog
app.get('/blogs/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((result)=>{
        res.render('details',{blog: result});
    })
    .catch((err)=>{
        console.log(error);
    })
});


// 404 error
app.use((req,res)=>{
    res.render('404');
});