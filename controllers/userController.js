const userModel = require("../models/userModel");
const { ObjectId } = require('mongoose').Types;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('U_V{D@[5dVQxpcQ');

const index = async (req, res) => {
    try {
        const sort = {
            created_at: -1
        };
        const users = await userModel.find({}, { __v: 0 }, { sort }).lean();

        return res.json({ status: 200, message: "Users fetched", data: users, error: false });
    } catch (error) {
        return res.json({ status: 500, message: "Error in fetching users", data: [], error: true });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const queryObj = {
            _id: ObjectId(id)
        };
        const user = await userModel.findOne(queryObj).lean();

        return res.json({ status: 200, message: "User fetched", data: user, error: false });
    } catch (error) {
        return res.json({ status: 500, message: "Error in fetching user", data: {}, error: true });
    }
};

const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ status: 403, message: "Invalid Input", data: {}, error: true });
        }

        const userData = {
            name,
            email_address: email,
            password: cryptr.encrypt(password)
        };

        const createUser = await userModel.create(userData);
        return res.json({ status: 200, message: "User created", data: createUser, error: false });
    } catch (error) {
        return res.json({ status: 500, message: "Error in creating user", data: {}, error: true });
    }
};

const upsert = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req;

        const queryObj = {
            _id: ObjectId(id)
        };
        const userExists = await userModel.findOne(queryObj).lean();
        if (!userExists) {
            return res.json({ status: 406, message: "User not exists", data: {}, error: true });
        }
        const userData = {
            name,
            email_address: email,
            password: cryptr.encrypt(password)
        };

        const updateUser = await userModel.findOneAndUpdate(queryObj, userData, {
            new: IS_BOOLEAN['TRUE']
        });
        return res.json({ status: 200, message: "User updated", data: updateUser, error: false });
    } catch (error) {
        return res.json({ status: 500, message: "Error in updating user", data: {}, error: true });
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.body;
        const deleteUser = await userModel.deleteOne(
            {
                _id: ObjectId(id)
            }
        );
        if (!deleteUser.nModified === 1) {
            return res.json({ status: 406, message: "User not exists", data: {}, error: true });
        }
        return res.json({ status: 200, message: "User deleted", data: {}, error: false });
    } catch (error) {
        return res.json({ status: 500, message: "Error in deleting user", data: {}, error: true });
    }
};

module.exports = { index, getUser, create, upsert, destroy };
