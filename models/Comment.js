const { Schema, model} = require('mongoose');

const commentSchema = new Schema(
    {   
        commentId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        commentcontent: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 4,
            
        }
    },
)

const Comment = model('comment', commentSchema);

module.exports = Comment;