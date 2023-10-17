var express = require('express');
var router = express.Router();
var Razorpay = require("razorpay")

var instance = new Razorpay({
  key_id: 'rzp_test_i4htX1389x3jt5',
  key_secret: 'W5KqO9lGmvvySfn4PWd0kqfW',
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/create/orderId', function (req, res, next) {
  var options = {
    amount: req.body.amount * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send(order)
  });
});

router.post('/api/payment/verify', function (req, res, next) {
  const razorpayOrderId = req.body.response.razorpay_order_id;
  const razorpayPaymentId = req.body.response.razorpay_payment_id;
  const signature = req.body.response.razorpay_signature;
  const secret = "W5KqO9lGmvvySfn4PWd0kqfW";
  var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
  validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
});

router.get('/success', function (req, res, next) {
  res.render('success');
});
module.exports = router;
