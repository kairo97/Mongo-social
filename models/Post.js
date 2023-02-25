const {Schema, model} = require('mongoose');

const postSchema = new Schema(
    {
        text: String,
        username: String,
        comments: [{ type: Schema.Type.ObjectId, ref: 'comment'}],
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