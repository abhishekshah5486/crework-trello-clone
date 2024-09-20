const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const userRoutes = require('../server/routes/userRoute');
const taskRoutes = require('../server/routes/taskRoute');
require('../server/config/dbConfig');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust based on your frontend URL
    credentials: true
}));


// Consume routes
app.use('/', userRoutes);
app.use('/', taskRoutes);

const port = process.env.PORT || 8086;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})