import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
