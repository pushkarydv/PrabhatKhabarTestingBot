import { UserModel } from '../models/user.model.js';

export const createNewUserIfNotExists = async (chatId) => {
  try {
    const user = await UserModel.find({ chatId });
    if (user.length === 0) {
      const newUser = new UserModel({ chatId });
      await newUser.save();
      return newUser;
    }
    return user[0];
  } catch (error) {
    console.error('Error creating new user:', error);
    throw new Error('Failed to create or find user');
  }
};

export const getUserByChatId = async (chatId) => {
  try {
    const user = await UserModel.find({ chatId });
    if (user.length === 0) {
      throw new Error('User not found');
    }
    return user[0];
  } catch (error) {
    console.error('Error getting user by chatId:', error);
    throw new Error('Failed to get user by chatId');
  }
};

export const updateUserSubscription = async (chatId, isSubscribed) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { chatId },
      { isSubscribedToWeather: isSubscribed },
      { new: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw new Error('Failed to update user subscription');
  }
};

export const banUser = async (chatId) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { chatId },
      { isBanned: true },
      { new: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error banning user:', error);
    throw new Error('Failed to ban user');
  }
};

export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const users = await UserModel.find({}).skip(skip).limit(limit);

    const total = await UserModel.countDocuments({});

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  } catch (error) {
    console.error('Error getting all users:', error);
    throw new Error('Failed to get all users');
  }
};
