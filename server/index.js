const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB Connected.")
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());
const port = process.env.PORT || 8086;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})