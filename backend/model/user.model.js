import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
        unique: true,
    },
    image:{
        type: 'string',
        default: true,
    },
    searchHistory: {
        type: Array,
        default: []
    }
})

export const User = mongoose.model('User',userSchema);