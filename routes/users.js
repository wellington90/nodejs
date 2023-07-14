var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var transaction = sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
  });

  setTimeout(() => {
    try {
      foo();
    } catch (e) {
      sentry.captureException(e);
    } finally {
      transaction.finish();
    }
  }, 99);
  
  res.send('respond with a resource');
});

module.exports = router;
