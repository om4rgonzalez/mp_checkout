const bodyParser = require('body-parser'); //bodyParser nos permite reicibir parametros por POST
const { Router } = require('express');
const router = Router();
const mercadoPagoController = require('../controller/mercadoPagoController');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());

router.post('/checkout/', async function(req, res) {
    let response = await mercadoPagoController.checkout(req.body);
    res.json({
        ok: true,
        response
    });
});

router.post('/notification', async function(req, res) {
    console.log(req.body);
    res.json({
        ok: true
    });
});






module.exports = router;