const express = require('express');
const router = express.Router();
require('dotenv').config();
const midtransClient = require('midtrans-client');

const SERVER_KEY = process.env.SERVER_KEY;
const CLIENT_KEY = process.env.CLIENT_KEY;

let snap = new midtransClient.Snap({
  isProduction : false,
  serverKey : SERVER_KEY,
  clientKey : CLIENT_KEY
});

router.post('/simple_checkout', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const zip = req.body.zip;
    const cardNum = req.body.cardNum;


      let parameter = {
        "transaction_details": {
          "order_id": "order-id-"+Math.round((new Date()).getTime() / 1000),
          "name": name,
          "email": email,
          "address": address,
          "city": city,
          "country": country,
          "zip code" : zip,
          "card number": cardNum,
          "gross_amount": 2
        }, "credit_card":{
          "secure" : true
        }
      };
      // create snap transaction token
      snap.createTransactionToken(parameter)
        .then((transactionToken)=>{
            res.status(200).json({message: transactionToken})
        })
})

router.post('/notification', function(req, res){
  snap.transaction.notification(req.body)
  .then((statusResponse)=>{
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    // Sample transactionStatus handling logic

    if (transactionStatus == 'capture'){
        if (fraudStatus == 'challenge'){
            // TODO set transaction status on your database to 'challenge'
            // and response with 200 OK
        } else if (fraudStatus == 'accept'){
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
        }
    } else if (transactionStatus == 'settlement'){
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
    } else if (transactionStatus == 'cancel' ||
      transactionStatus == 'deny' ||
      transactionStatus == 'expire'){
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
    } else if (transactionStatus == 'pending'){
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
    }
})})



module.exports = router;