const { Router } = require('express');
const mercadopago = require('mercadopago');

checkout = async(body) => {
    mercadopago.configure({
        integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
        access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
    });

    var preference = {
        items: [],
        payer: {
            name: body.cliente.nombres,
            surname: body.cliente.apellidos,
            email: body.cliente.email,
            date_created: '2020-06-02T12:58:41.425-04:00',
            phone: {
                area_code: body.cliente.codigoArea,
                number: body.cliente.numeroTelefono
            },

            identification: {
                type: 'DNI',
                number: body.cliente.dni
            },

            address: {
                street_name: body.direccion.calle,
                street_number: body.direccion.numeroCasa,
                zip_code: body.direccion.codigoPostal
            }
        },
        back_urls: {
            success: 'http://bintelligence.net/jormendoza/success',
            failure: 'http://bintelligence.net/jormendoza/failure',
            pending: 'http://bintelligence.net/jormendoza/pending'
        },
        auto_return: 'approved',
        payment_methods: {
            excluded_payment_methods: [{
                id: 'amex'
            }],
            excluded_payment_types: [{
                id: 'atm'
            }],
            installments: 6
        },
        notification_url: 'https://www.your-site.com/ipn',
        external_reference: body.developer.email,
        expires: true,
        expiration_date_from: '2020-01-01T12:00:00.000-04:00',
        expiration_date_to: '2020-08-28T12:00:00.000-04:00'

    };

    body.productos.forEach(producto => {
        preference.items.push({
            id: producto.id,
            title: producto.nombreProducto,
            currency_id: 'ARS',
            picture_url: producto.URI,
            description: producto.descripcion,
            category_id: 'art',
            quantity: producto.cantidad,
            unit_price: producto.precio
        })
    });

    let urlFinal;

    await mercadopago.preferences.create(preference)
        .then(function(response) {
            // Este valor reemplazará el string '$$init_point$$' en tu HTML
            global.init_point = response.body.init_point;
            console.log(global.init_point);
            urlFinal = global.init_point;
        }).catch(function(error) {
            console.log(error);
        });

    return urlFinal;
};


module.exports = {
    checkout
}