import mongoose from 'mongoose'
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';
const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
});

const validatePassword = function (password, cb) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
  if(re.test(password) === true){
      return cb();
  } else{
    return cb("Error");
  }
};

userSchema.plugin(passportLocalMongoose, {
    passwordValidator: validatePassword

});

export default  mongoose.model('User', userSchema);