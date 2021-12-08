const express = require('express');
const midTransClient = require('midtrans-client');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routers/index');
require('dotenv').config();


const SERVER_KEY = process.env.SERVER_KEY;
const CLIENT_KEY = process.env.CLIENT_KEY;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './src/public')))

/**
 * ===============
 * Using Snap API
 * ===============
 */

app.use('/snap', router);

app.listen(3000,()=>{
    console.log(`Server listening at port ${3000}`)
})