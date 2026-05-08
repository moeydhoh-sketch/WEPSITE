import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  image: String,
  isApproved: { type: Boolean, default: false },
  expiresAt: { type: Date, default: null },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);