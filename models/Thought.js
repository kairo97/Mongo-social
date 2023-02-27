const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type:String,
        required:true,
        min_length:1,
        max_length: 280
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      username: {
        type:String,
        required:true,

      },
      reactions:{
        type:Schema.Types.ObjectId,
        ref:"reactions"
      }
                
           
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
    thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;