const {Schema, model} = require('mongoose');
const Comment = require('./Comment')
const postSchema = new Schema(
    {
       published: {
            type: Boolean,
            default: false,
       },
       content: {
        type: String,
       },
        comments: [
            {
                 type: Schema.Types.ObjectId,
                  ref: 'Comment'
                }
            ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const Post = model('post', postSchema);

module.exports = Post;