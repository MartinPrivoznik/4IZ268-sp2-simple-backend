import mongoose from 'mongoose';
import { seedDatabase } from './seed';

/**
 * Connects to the MongoDB database. Exits the process if the connection fails.
 */
const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI =
      process.env.DATABASE_URL ||
      (() => {
        throw new Error('MongoDB URI is not provided');
      })();
    await mongoose.connect(mongoURI);
    await seedDatabase();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    process.exit(1);
  }
};

// Try to reconnect when app is disconnected
mongoose.connection.on('disconnected', () => {
  connectDatabase();
});

// Shutdown Mongo connection when app is terminated
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default connectDatabase;
