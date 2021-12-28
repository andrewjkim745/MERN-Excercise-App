const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        minlength: 3
},
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }]
    
}, {
    timestamps: true,
});


const User = mongoose.model('User', userSchema);
module.exports = User;