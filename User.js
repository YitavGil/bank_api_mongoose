const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    city: String,
    age: Number,
    cash: Number,
    credit:Number
})

module.exports = mongoose.model("User", userSchema)