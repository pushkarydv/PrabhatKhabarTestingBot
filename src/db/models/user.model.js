import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const UserSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    isSubscribedToWeather: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = models.User || model('User', UserSchema);

export { UserModel };
