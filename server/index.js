const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoute');
require('./config/dbConfig');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    credentials: true
}));


// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Consume routes
app.use('/', userRoutes);
app.use('/', taskRoutes);

const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
