const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique:true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

        },
        password: {
            type: String,
            required:true,
            max_length:20,
            
        },
        thoughts: {
            type:Schema.Types.ObjectId,
            ref: "thoughts"
        },
        friends: {
            type:Schema.Types.ObjectId,
            ref: "friends"
        }
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