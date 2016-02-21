'use strict';

var beerbot = require('../lib/beerbot');

var token = process.env.BOT_API_KEY;
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var beerbot = new beerbot({
    token: token,
    dbPath: dbPath,
    name: name
});

beerbot.run();