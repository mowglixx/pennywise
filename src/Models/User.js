import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        minLength: 2,
        maxLength: 64
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        
    },
    image: String,
});

const User = mongoose.models?.User || mongoose.model('user', UserSchema, 'users')

export default User