const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const photographerRoutes = require('./routes/photographers');

const app = express();

// ✅ Apply Helmet
app.use(helmet());

// ✅ Custom CSP allowing external images and scripts
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://pixisphere.netlify.app https://pixisphere-project.netlify.app; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';"
  );
  next();
});

// ✅ Enable CORS for both local and deployed frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://pixisphere.netlify.app',
    'https://pixisphere-project.netlify.app'
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Serve static images and favicon
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'public/favicon.ico')));

// ✅ Default root route
app.get('/', (req, res) => {
  res.status(200).send('Pixisphere API is running.');
});

// ✅ Mount photographers API route
app.use('/api/photographers', photographerRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
