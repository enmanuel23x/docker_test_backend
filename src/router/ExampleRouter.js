const router = require('express').Router();
//Controller
const { ExampleRoute } = require('../controller/ExampleController');

router.get('/', ExampleRoute);

module.exports = router;