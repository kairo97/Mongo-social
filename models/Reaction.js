const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    thoughtId: {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  }
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
