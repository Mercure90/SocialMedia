const User = require('../models/User')
const {
    StatusCodes
} = require('http-status-codes')
const {
    BadRequestError,
    UnauthenticatedError
} = require('../errors')


const updateUser = async (req, res) => {
    res.status(200).json({"result":"success","msg":"updateUser"})
}
const getUser = async (req, res) => {
    res.status(200).json({"result":"success","msg":"getUser"})
}
const deleteUser = async (req, res) => {
    res.status(200).json({"result":"success","msg":"deleteUser"})
}

module.exports = {
    updateUser,
    getUser,
    deleteUser
}