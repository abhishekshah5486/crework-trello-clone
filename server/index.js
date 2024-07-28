const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8086;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})