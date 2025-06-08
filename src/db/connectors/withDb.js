import dbConnect, { disconnectDb } from './mongodb.js';

const withDb = async (fn) => {
  await dbConnect();
  try {
    await fn();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await disconnectDb();
  }
};

export default withDb;
