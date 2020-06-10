var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "merch_id_here",
  publicKey: "keyhere",
  privateKey: "Your_key_here",
});

exports.gettoken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
};
