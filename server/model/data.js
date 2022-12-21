const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", DataSchema);
module.exports = Data;

// "Id":18,
// "name":"Aditeya Arora",
// "email":"aditeya_arora@abc.com",
// "gender":"Female",
// "status":"Inactive",
// "created_at":"2020-09-07T03:50:03.766+05:30",
// "updated_at":"2020-09-07T03:50:03.766+05:30"
