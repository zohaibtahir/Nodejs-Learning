const express = require('express');

// express app
const app = express();

// view engine
app.set('view engine' , 'ejs');

// listen 
app.listen(3000);

// Middleware for static files
app.use(express.static('public'));

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