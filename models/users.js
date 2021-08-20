import mongoose from 'mongoose'
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';
import findOrCreate from 'mongoose-findorcreate'
const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: String,
    refreshToken: String
});
userSchema.plugin(findOrCreate)
userSchema.plugin(passportLocalMongoose, {
    passwordValidator: function (password, cb) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
      if(re.test(password) === true){
          return cb();
      } else{
        return cb("Error");
      }
    }
});

export default  mongoose.model('User', userSchema);