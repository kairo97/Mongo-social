const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: String,
        email: String,
        
    }
)