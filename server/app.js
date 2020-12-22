const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json({ limit : '50MB' }));

// Connect routes
const User = require('./routes/user');
const Comment = require('./routes/comment');
const Like = require('./routes/like');
const Favorite = require('./routes/favorite');

app.use('/user', User);
app.use('/comment', Comment);
app.use('/like', Like);
app.use('/favorite', Favorite);

module.exports = app;
