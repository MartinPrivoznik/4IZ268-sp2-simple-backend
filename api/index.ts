import app from '../src';
import connectDatabase from '../src/database/db';

const port = process.env.PORT || '3000';

connectDatabase();
app.get('/', (req, res) => res.send('Express on Vercel'));
app.listen(port);

module.exports = app;
