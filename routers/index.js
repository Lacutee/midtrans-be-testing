const express = require('express');
const router = express.Router();
require('dotenv').config();
const midtransClient = require('midtrans-client');

const SERVER_KEY = process.env.SERVER_KEY;
const CLIENT_KEY = process.env.CLIENT_KEY;

router.post('/simple_checkout', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const zip = req.body.zip;
    const cardNum = req.body.cardNum;

    let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : SERVER_KEY,
        clientKey : CLIENT_KEY
      });
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
            res.send(transactionToken)
        })
})


module.exports = router;