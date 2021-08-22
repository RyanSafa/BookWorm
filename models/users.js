import mongoose from 'mongoose'
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';
import ApiError from '../utils/ApiError.js';
const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
      type:String
    },
    stocks: {
      
    }
});
const options = {
  passwordValidator: function (password, cb) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    if(re.test(password) === true){
        return cb();
    } else{
      return cb(new ApiError(400,"Your password was either not 8 characters long, didn't include a number, a lower case  and upper case letter"));
    }
  }
}
userSchema.plugin(passportLocalMongoose, options);

export default  mongoose.model('User', userSchema);