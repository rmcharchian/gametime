
var pg = require('pg');

var pool = new pg.Pool({
    database: 'gametime',
    port: 6117,
    ssl: false,
    max: 20, //set pool max size to 20
    min: 4, //set min pool size to 4
    idleTimeoutMillis: 1000 //close idle clients after 1 second
});

module.exports = pool;
