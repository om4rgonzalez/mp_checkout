const { Router } = require('express');
const mercadopago = require('mercadopago');

checkout = async() => {
    mercadopago.configure({
        access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
    });

    var preference = {
        items: [{
            title: 'Test',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 10.5
        }]
    };


    mercadopago.preferences.create(preference)
        .then(function(response) {
            // Este valor reemplazará el string "$$init_point$$" en tu HTML
            global.init_point = response.body.init_point;
            console.log(global.init_point);
        }).catch(function(error) {
            console.log(error);
        });
};


module.exports = {
    checkout
}