const mongoose = require("mongoose");
const plm = require('passport-local-mongoose');//auth code

const path = "mongodb://127.0.0.1:27017/localAuthentication";
mongoose.connect(path);

const userSchema = mongoose.Schema({//User schema
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
  },
})

userSchema.plugin(plm);//auth code

module.exports = mongoose.model("User", userSchema);
