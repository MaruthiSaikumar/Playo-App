const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    appliedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Event",
      },
    ],
    approvedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
