const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors');
const path = require('path');
const connectDb = require('./config/connectDb');

// Config dotenv file
dotenv.config()

// databse conn
connectDb();

//  rest object
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes
// user Routes
app.use('/api/v1/users', require('./routes/userRoutes'))

// Transection routes
app.use('/api/v1/transections', require('./routes/transectionRoutes'))

// Static Files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname), './client/build/index.html');
})


// Port
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgYellow.white);
}) 