import 'dotenv/config'
import app from './src/app.js';
import connectDB from './src/config/db.js';

await connectDB()


const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

