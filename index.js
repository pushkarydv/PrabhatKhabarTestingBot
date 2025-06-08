import TelegramBot from 'node-telegram-bot-api';

import withDb from './src/db/connectors/withDb.js';
import dbConnect from './src/db/connectors/mongodb.js';

import {
  createNewUserIfNotExists,
  updateUserSubscription,
} from './src/db/services/user.service.js';

const token = process.env.BOT_TOKEN;

// fetch new updates
const bot = new TelegramBot(token, { polling: true });

// polling based listener
bot.on('message', async (msg) => {
  await dbConnect();
  const chatId = msg.chat.id;

  console.log(msg);

  if (msg.text === '/start') {
    const userCreateRequest = await createNewUserIfNotExists({
      chatId: chatId,
      name: msg.chat?.first_name || '',
      username: msg.chat?.username || '',
    });

    console.log('User created or found:', userCreateRequest);

    bot.sendMessage(
      chatId,
      `Hello ${
        userCreateRequest?.name || ''
      },\nWelcome to Prabhat Khabar Testing Bot! \n\nUse /subscribe to get daily news updates or /help for more commands.`
    );
  }

  if (msg.text === '/subscribe') {
    let subscription = await updateUserSubscription({
      chatId: chatId,
      isSubscribed: true,
      name: msg.chat?.first_name || '',
      username: msg.chat?.username || '',
    });

    console.log('User subscribed:', subscription);

    // some await and add this user to db
    bot.sendMessage(
      chatId,
      'You have been subscribed to Prabhat Khabar daily news updates! \n\nYou will receive the latest news every day. To unsubscribe, type /unsubscribe'
    );
  }

  if (msg.text === '/unsubscribe') {
    let unsubscription = await updateUserSubscription({
      chatId: chatId,
      isSubscribed: false,
      name: msg.chat?.first_name || '',
      username: msg.chat?.username || '',
    });

    console.log('User unsubscribed:', unsubscription);

    // some await and remove this user from db
    bot.sendMessage(
      chatId,
      'You have been unsubscribed from Prabhat Khabar news updates. \n\nTo subscribe again and stay updated with daily news, type /subscribe'
    );
  }

  if (msg.text === '/help') {
    bot.sendMessage(
      chatId,
      'Prabhat Khabar Testing Bot Commands:\n\n/start - Welcome message\n/subscribe - Get daily news updates\n/unsubscribe - Stop news updates\n/help - Show this help message'
    );
  }
});
