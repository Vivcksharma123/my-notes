const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Notes API is running!' });
});

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

