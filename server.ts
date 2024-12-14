import app from './src';
import connectDatabase from './src/database/db';

const port = process.env.PORT || '3000';

async function main() {
  try {
    await connectDatabase();
    app.listen(port);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    process.exit(1);
  }
}

main();
