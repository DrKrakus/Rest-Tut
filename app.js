const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Import Routes
const postsRoute = require('./routes/posts');

// Middleware (order matters)
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
);

// How we listening to the server
app.listen(3000);