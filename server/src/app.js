const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items');
const authMiddleware = require('./middleware/auth');
const { body, validationResult } = require('express-validator');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/items', authMiddleware, [
  body('name').optional().isLength({ min: 2 }).withMessage('Item name must be at least 2 characters'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, itemsRouter);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/shoppinglist';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = app; 