import TelegramBot from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN;

// fetch new updates
const bot = new TelegramBot(token, { polling: true });

// polling based listener
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === '/start') {
    bot.sendMessage(
      chatId,
      'Welcome to Prabhat Khabar Testing Bot! \n\nUse /subscribe to get daily news updates or /help for more commands.'
    );
  }

  if (msg.text === '/subscribe') {
    // some await and add this user to db
    bot.sendMessage(
      chatId,
      'You have been subscribed to Prabhat Khabar daily news updates! \n\nYou will receive the latest news every day. To unsubscribe, type /unsubscribe'
    );
  }

  if (msg.text === '/unsubscribe') {
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
