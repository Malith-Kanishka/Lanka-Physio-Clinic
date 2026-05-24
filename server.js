import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API placeholder route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Lanka Physio Clinic API is running.' });
});

// Serve static assets in production
const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  // If dist/index.html doesn't exist, we send a basic message (for development before build)
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('Lanka Physio Clinic Backend is running. Frontend dev server is on port 5173. Build frontend using "npm run build" to serve it here.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
