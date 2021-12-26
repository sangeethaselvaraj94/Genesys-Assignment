const userModel = require("../models/userModel");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('U_V{D@[5dVQxpcQ');

const validateLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.json({ status: 403, message: "Invalid Input", data: {}, error: true });

        const queryObj = {
            email_address: email
        };

        const user = await userModel.findOne(queryObj).lean();

        if (user) {
            const decryptPassword = cryptr.decrypt(user.password);
            if (password === decryptPassword) {
                await userModel.updateOne(queryObj, { $set: { last_login: new Date() } });
                return res.json({ status: 200, message: "Login successful!", data: {}, error: true });
            } else {
                return res.json({ status: 403, message: "Incorrect Password", data: {}, error: true });
            }
        } else {
            return res.json({ status: 403, message: "Invalid Email", data: {}, error: true });
        }
    } catch (error) {
        return res.json({ status: 500, message: "Error in fetching users", data: [], error: true });
    }
};

module.exports = { validateLogin };
