const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  ForbidenError,
  NotFoundError,
} = require("../errors");

// create a post
const createPost = async (req, res) => {
  req.body.userBy = req.user.userId;

  const newPost = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({
    newPost,
  });
};
// update a post
const updatePost = async (req, res) => {
  const {
    body: { desc },
    user: { userId },
    params: { id: postId },
  } = req;

  if (desc === "") {
    throw new BadRequestError("desc fields cannot be empty");
  }
  const post = await Post.findByIdAndUpdate(
    {
      _id: postId,
      userBy: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!post) {
    throw new NotFoundError(`you don't own a post with id ${postId}`);
  }
  res.status(StatusCodes.OK).json({
    post,
  });
};
// delete a post
const deletePost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;

  const post = await Post.findByIdAndRemove({
    _id: postId,
    userBy: userId,
  });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  res.status(StatusCodes.OK).send("Post Deleted");
};
// like a post
const likePost = async (req, res) => {
  const {
    user: { userId },
    params: { id: postId },
  } = req;
  const post = await Post.findOne({
    _id: postId,
    userBy: userId,
  });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  if(!post.likes.includes(userId)){
    await post.updateOne({$push:{likes:userId}})
  }else{
    await post.updateOne({$pull:{likes:userId}})
  }
  res.status(StatusCodes.OK).json({
    post,
  });

};
// get a post
const getPost = async (req, res) => {
    //console.log(req)
  const {
    user: { userId },
    params: { id: postId },
  } = req;

  const post = await Post.findOne({
    _id: postId,
    userBy: userId,
  });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  res.status(StatusCodes.OK).json({
    post,
  });
};
// get timeline
const getPostTimeline = async (req, res) => {
    let postArray =[]
    const {
        user: { userId }
      } = req;
    const currentUser = await User.findById(userId)
    const userPost = await Post.find({userBy: userId});
    const friendsPost = await Promise.all(
        currentUser.following.map((friendId) => {
            return Post.find({userBy: friendId})
        })
    );

    res.status(200).json(userPost.concat(...friendsPost));
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getPostTimeline,
};
