const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    isadmin: { type: Boolean, required: true },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
