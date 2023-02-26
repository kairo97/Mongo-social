const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            max_length: 50,
        },
        email: {
            type: String,
            required: true,
            unique:true,
            max_length: 50,

        },
        password: {
            type: String,
            required:true,
            max_length:20,
        
    },
    posts: [
        {
        type:Schema.Types.ObjectId,
        ref: "Post"
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// userSchema.virtual('user').get(function () {
//     return
// })
const User = model('user', userSchema);

module.exports = User;