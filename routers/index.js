const express = require('express');
const router = express.Router();
require('dotenv').config();
const midtransClient = require('midtrans-client');

const SERVER_KEY = process.env.SERVER_KEY;
const CLIENT_KEY = process.env.CLIENT_KEY;

router.get('/simple_checkout', function(req, res){
    let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : SERVER_KEY,
        clientKey : CLIENT_KEY
      });
      let parameter = {
        "transaction_details": {
          "order_id": "order-id-node-"+Math.round((new Date()).getTime() / 1000),
          "gross_amount": 200000
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