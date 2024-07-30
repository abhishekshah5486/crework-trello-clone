const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('../server/routes/userRoute');
require('../server/config/dbConfig');

const app = express();
app.use(express.json());

// Consume routes
app.use('/', userRoutes);

const port = process.env.PORT || 8086;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})