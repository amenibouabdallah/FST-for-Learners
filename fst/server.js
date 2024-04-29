const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const fileRoutes =require('./routes/fileRoutes');
const admin = require('./routes/adminRoutes');
const user = require('./routes/userRoutes');
const bodyParser = require('body-parser');



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const cloudinary = require("./cloudinary/cloudinary");

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


  app.use(cors()); // Enable CORS
  app.use(bodyParser.json()); // Parse JSON request bodies
  app.use(express.json({ limit: '100mb' })); // Increased JSON payload limit
  app.use(express.urlencoded({ extended: true, limit: '100mb' })); // Parse URL-encoded bodies
  app.use(express.json());

  // Routes
  app.use('/auth', authRoutes);
  app.use('/api/files', fileRoutes);
  app.use('/admin', admin);
  app.use('/user',user);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(port, () => console.log(`Server is running on port ${port}`));