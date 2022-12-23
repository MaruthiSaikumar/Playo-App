const mongoose = require("mongoose");
const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Add a Title"],
    },
    description: {
      type: String,
      required: [true, "Please Add a Title"],
    },

    timeOfEvent: {
      type: Date,
      required: [true, "Please Add a timeOfEvent"],
    },
    playersLimit: {
      type: Number,
      required: [true, "Please Add a playersLimit"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    usersApplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
      },
    ],
    usersApproved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],

    requirements: {
      type: String,
      required: [true, "Please Add a requirements"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
