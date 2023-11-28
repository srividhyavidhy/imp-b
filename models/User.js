const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
          name:{
                    type:String
          },
          email:{
                    type:String
          },
          mobile:{
                    type:String
          },
});

const User = mongoose.model('User',userSchema);
module.exports = User;