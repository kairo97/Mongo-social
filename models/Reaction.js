const {Schema, model} = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionBody:{
            type:String,
            required:true,
            max_length:280,
        },
        username:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
)
const Reaction = model('reactions', reactionSchema);

module.exports = Reaction;