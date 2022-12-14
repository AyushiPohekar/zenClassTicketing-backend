const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const QuerySchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "userdb",
  },
  subject: {
    type: String,
    maxlength: 100,
    required: true,
    default: "",
  },
  category: {
    type: String,
    required: true,
},
subCategory: {
    type: String,
},
description: {
    type: String,
    minlength: 5,
    maxlength: 1000,
    trim: true,
    required: true,
},
  openAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status1: {
    type: String,
    maxlength: 30,
    required: true,
    enum: [ 'OPEN', 'CLOSE', 'REOPEN'],
    default: "OPEN",
  },
  status2: {
    type: String,
    maxlength: 30,
    required: true,
    enum: ["UNASSIGNED", "ASSIGNED", 'RESOLVED'],
    default: "UNASSIGNED",
  },


preferredLanguage: {
    type: String,
    required: true,
},
availableTime:[ {
    from: {
        type: String,
        required: true,
    },
    till: {
        type: String,
        required: true,
    },
},],
  rasiedBy: {
    type: ObjectId,
    required: true,
    ref:"users",
},

solution: {
  type: String,
  minlength: 5,
  maxlength: 1000,
  trim: true,
},
feedback: {
  type: String,
  minlength: 5,
  maxlength: 1000,
  trim: true,
},
rating: {
  type: Number,
  min: 0,
  max: 5,
},
});

module.exports = {
  QuerySchema: mongoose.model("query", QuerySchema),
};