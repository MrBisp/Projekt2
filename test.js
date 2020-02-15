const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

//Connect to DB
mongoose.connect('mongodb+srv://admin:marza123@semester2-p9wyp.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true },
    () => {
        console.log('Connected til database');
    });

BlogPost.create({
    title: 'title',
    body: 'body'
}, (error, blogpost) => {
    console.log('test');
    console.log(error, blogpost);
});