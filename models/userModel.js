const mongoose = require("../db/mongodb");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true
        },
        email_address: {
            type: String,
            unique: true,
            index: true
        },
        password: {
            type: String
        },
        last_login_date: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);
module.exports = mongoose.model("user", userSchema);
