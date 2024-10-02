import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    tgId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    }
})

const User = new mongoose.model("User", userSchema)
export default User;