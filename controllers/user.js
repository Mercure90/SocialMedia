const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  ForbidenError,
} = require("../errors");

const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    throw new NotFoundError(`No user with id ${req.params.id}`);
  }
  const { password, updatedAt, ...others } = user._doc;
  res.status(200).json(others);
};
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(200).json("Account has been updated");
  } else {
    throw new ForbidenError("you can only update your own accout !");
  }
};
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    const user = await User.deleteOne({ _id: req.params.id });
    return res.status(200).json("Account has been deleted");
  } else {
    throw new ForbidenError("you can only delete your own accout !");
  }
};

const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).json("user has been followed")
    } else {
      throw new ForbidenError("You already follow this user");
    }
    return res.status(200).json("follow user");
  }
  throw new ForbidenError("you can't follow yourself' !");
};

const unfollowUser = async (req, res) => {
  return res.status(200).json("unfollow user");
};

module.exports = {
  updateUser,
  getUser,
  deleteUser,
  followUser,
  unfollowUser,
};
