const express = require('express');
const app = express();
app.use(express.json());//we use this so that we don't have to parse json object manually
require('dotenv').config();
const dbconfig = require('./config/dbConfig');
const cors = require('cors');//it is used so that it will connect with frontend
app.use(cors());
const port = process.env.PORT || 8080;

const userRoute = require('./routes/userRoute');
const productsRoute = require('./routes/productsRoute');
const bidsRoute = require('./routes/bidsRoute');
const notificationRoute = require('./routes/notificationsRoute')

app.use('/api/users', userRoute);
app.use('/api/products', productsRoute);
app.use('/api/bids', bidsRoute)
app.use('/api/notification', notificationRoute);
app.listen(port, () => console.log(`server has been started on port ${port}`))
