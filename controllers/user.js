const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if (!user) {
        throw new NotFoundError(`No user with id ${req.params.id}`)
    }
    const {password,updatedAt, ...others} =user._doc
    res.status(200).json(others);
};
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    return res.status(200).json("Account has been updated");
  } else {
    return res.status(403).json("you can only update your own accout !");
  }
};
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    const user = await User.deleteOne({_id: req.params.id});
    return res.status(200).json("Account has been deleted");
  } else {
    return res.status(403).json("you can only delete your own accout !");
  }
};

const followUser = async (req,res) =>{
  return res.status(200).json("follow user");
}

const unfollowUser = async (req,res) =>{
  return res.status(200).json("unfollow user");
}

module.exports = {
  updateUser,
  getUser,
  deleteUser,
  followUser,
  unfollowUser
};
