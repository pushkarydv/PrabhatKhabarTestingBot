import TelegramBot from 'node-telegram-bot-api';
import withDb from './src/db/connectors/withDb.js';
import { UserModel } from './src/db/models/user.model.js';


export const sendWeatherUpdatesToSubscribedUsers = async (weatherData, bot) => {
  try {
    const subscribedUsers = await UserModel.find({
      isSubscribedToWeather: true,
      isBanned: false,
    });

    for (const user of subscribedUsers) {
      try {
        const chatId = user.chatId;
        const message = `Hello ${
          user.name || user.username
        },\n\nHere is your weather update:\n${weatherData}`;
        await bot.sendMessage(chatId, message);
      } catch (error) {
        console.error(`Failed to send message to user ${user.chatId}:`, error);
      }
    }
  } catch (error) {
    console.error('Error fetching subscribed users:', error);
  }
};

const sendWeatherUpdates = async () => {
    const token = process.env.BOT_TOKEN;
    const bot = new TelegramBot(token);
    await withDb(async () => {
        const weatherData = "Today's weather is sunny with a high of 25°C and a low of 15°C.";
        await sendWeatherUpdatesToSubscribedUsers(weatherData, bot);
    }); 
}

sendWeatherUpdates()