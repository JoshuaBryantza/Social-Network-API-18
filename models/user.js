const { Schema, model } = require('mongoose');
const { Thought } = require('./thought');


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
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

// Virtual to get the count of friends for a user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;







// const { Schema, model } = require('mongoose');

// const userSchema = new Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/.+@.+\..+/, 'Please enter a valid email address']
//   },
//   thoughts: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Thought'
//     }
//   ],
//   friends: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'User'
//     }
//   ]
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;