const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const mysqlConnection = mysql.createPool(database);

mysqlConnection.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected');

    return;
});

// Promisify Pool Querys
mysqlConnection.query = promisify(mysqlConnection.query);

module.exports = pool;





// const mysql = require('mysql');

// const mysqlConnection = mysql.createConnection({
//     host: '66.97.38.48',
//     user: 'jorge',
//     password: 'Bintelligence123!',
//     database: 'dbFullmayorista',
//     multipleStatements: true
// });

// mysqlConnection.connect(function(err) {
//     if (err) {
//         console.error(err);
//         return;
//     } else {
//         console.log('db esta conectada');
//     }
// });

// module.exports = mysqlConnection;