const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

//Laver en Schema
const BlogPostSchema = new Schema({
    title: String,
    body: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;
