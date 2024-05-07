const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction'); // Assuming you have a separate file for reactionSchema
const dateFormat = require('../utils/data');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true // Include virtual properties when data is requested
    }
    // id: false // Disable virtuals to get id
  }
);

// Virtual to get the count of reactions for a thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;















// const { Schema, model } = require('mongoose');

// const thoughtSchema = new Schema(
//   {
//     thoughtText: {
//       type: String,
//       required: true,
//       minlength: 1,
//       maxlength: 280
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) => dateFormat(createdAtVal)
//     },
//     username: {
//       type: String,
//       required: true
//     },
//     reactions: [reactionSchema]
//   },
//   {
//     toJSON: {
//       getters: true
//     }
//   }
// );

// const Thought = mongoose.model('Thought', thoughtSchema);

// module.exports = Thought;