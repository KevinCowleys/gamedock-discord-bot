const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    id: Number,
    alias: String,
    tier: String,
    online_status: String,
    discord: String,
})

module.exports = mongoose.model("users", Users)