const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('../server/routes/userRoute');

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB Connected.")
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());

// Consume routes
app.use('/', userRoutes);

const port = process.env.PORT || 8086;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})