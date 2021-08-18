import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 18
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
