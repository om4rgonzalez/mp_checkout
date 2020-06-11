const bodyParser = require('body-parser'); //bodyParser nos permite reicibir parametros por POST
const { Router } = require('express');
const router = Router();

router.use(bodyParser.urlencoded({ extended: true }))

router.use(bodyParser.json())



router.use(require('./mercadoPago'));
// router.use(require('./production'));











module.exports = router;