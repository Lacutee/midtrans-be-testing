const express = require('express');
const midTransClient = require('midtrans-client');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routers');
const cors = require('cors');

const app = express();
app.use(cors(
    
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './src/public')))

/**
 * ===============
 * Using Snap API
 * ===============
 */

app.use('/snap', router);

app.listen(3001,()=>{
    console.log(`Server listening at port ${3001}`)
})