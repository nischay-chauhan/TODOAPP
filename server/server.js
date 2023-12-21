const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoute')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/notes')

mongoose.connection.on('connected' , () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
  
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

app.use('/api/tasks' , taskRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT , () => {
    console.log(`Server started on port ${PORT}`);
})