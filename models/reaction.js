const { Schema } = require('mongoose');
const dateFormat = require('../utils/data');

const reactionSchema = new Schema({
  // reactionId: {
  //   type: Schema.Types.ObjectId,
  //   default: () => new Schema.Types.ObjectId()
  // },
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
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  }
},
  {
    toJSON: {
      getters: true
      // virtuals: true // Include virtual properties when data is requested
    },
    id: false // Disable virtuals to get id
  }
);

module.exports = reactionSchema;


