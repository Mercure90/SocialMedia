const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  ForbidenError,
} = require("../errors");

// create a post
const createPost = async(req,res) =>{
    res.status(200).json('create')
}
// update a post
const updatePost = async(req,res) =>{
    res.status(200).json('update')
}
// delete a post
const deletePost = async(req,res) =>{
    res.status(200).json('delete')
}
// like a post
const likePost = async(req,res) =>{
    res.status(200).json('like')
}
// get a post
const getPost = async(req,res) =>{
    res.status(200).json('get')
}
// get timeline
const getPostTimeline = async(req,res) =>{
    res.status(200).json('get')
}


module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getPostTimeline,
}