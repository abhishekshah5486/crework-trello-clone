const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('../server/routes/userRoute');
const taskRoutes = require('../server/routes/taskRoute');
require('../server/config/dbConfig');

const app = express();
app.use(express.json());

// Consume routes
app.use('/', userRoutes);
app.use('/', taskRoutes);

const port = process.env.PORT || 8086;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})