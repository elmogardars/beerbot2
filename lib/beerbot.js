'use stcict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');

var beerbot = function Constructor(settings) {
this.settings = settings;
this.settings.name = this.settings.name || 'beerbot';
this.dbPath = settings.dbPath || path.resolve(__dirname, '..', 'data', 'beerbot.db');
   this.user = null;
    this.db = null;
};

util.inherits(beerbot, Bot);
module.exports = beerbot;

beerbot.prototype.run = function () {
beerbot.super_.call(this, this.settings);

this.on('start', this._onStart);
this.on('message', this._onMessage);
};

beerbot.prototype._onStart = function () {
this._loadBotUser();
this._connectDb();
this._firstRunCheck();
};

beerbot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

beerbot.prototype._connectDb = function () {
    if (!fs.existsSync(this.dbPath)) {
        console.error('Database path ' + '"' + this.dbPath + '" does not exists or it\'s not readable.');
        process.exit(1);
    }

    this.db = new SQLite.Database(this.dbPath);
};

beerbot.prototype._firstRunCheck = function () {
    var self = this;
    self.db.get('SELECT val FROM info WHERE name = "lastrun" LIMIT 1', function (err, record) {
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }

        var currentTime = (new Date()).toJSON();

        // this is a first run
        if (!record) {
            self._welcomeMessage();
            return self.db.run('INSERT INTO info(name, val) VALUES("lastrun", ?)', currentTime);
        }

        // updates with new last running time
        self.db.run('UPDATE info SET val = ? WHERE name = "lastrun"', currentTime);
    });
};

beerbot.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'test' +
        '\n Just say' + this.name + '` to invoke me!',
        {as_user: true});
};

beerbot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningbeer(message)
    ) {
        this._replyWithinvite(message);
    }
	else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningIPA(message)
    ) {
        this._replyWithIPA(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioninglager(message)
    ) {
        this._replyWithlager(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningstout(message)
    ) {
        this._replyWithstout(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningpilsner(message)
    ) {
        this._replyWithpilsner(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningbarleywine(message)
    ) {
        this._replyWithbarleywine(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningblonde(message)
    ) {
        this._replyWithblonde(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioninghveitibjor(message)
    ) {
        this._replyWithhveitibjor(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningredale(message)
    ) {
        this._replyWithredale(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningporter(message)
    ) {
        this._replyWithporter(message);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningcal(message)
    ) {
        this._replyWithcalmessage);
}
else if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFrombeerbot(message) &&
        this._isMentioningwhateveryouwant(message)
    ) {
        this._replyWithwhatever(message);
}
};



beerbot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

beerbot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

beerbot.prototype._isFrombeerbot = function (message) {
    return message.user === this.user.id;
};

beerbot.prototype._isMentioningwhateveryouwant = function (message) {
    return message.text.toLowerCase().indexOf('beer me') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

beerbot.prototype._isMentioningbeer = function (message) {
    return message.text.toLowerCase().indexOf('hvernig bjór') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

beerbot.prototype._isMentioningIPA = function (message) {
    return message.text.toLowerCase().indexOf('ipa') > -1;
};

beerbot.prototype._isMentioninglager = function (message) {
    return message.text.toLowerCase().indexOf('lager') > -1;
};
beerbot.prototype._isMentioningstout = function (message) {
    return message.text.toLowerCase().indexOf('stout') > -1;
};
beerbot.prototype._isMentioningpilsner = function (message) {
    return message.text.toLowerCase().indexOf('pilsner') > -1;
};
beerbot.prototype._isMentioningblonde = function (message) {
    return message.text.toLowerCase().indexOf('blonde') > -1;
};
beerbot.prototype._isMentioningbarleywine = function (message) {
    return message.text.toLowerCase().indexOf('barleywine') > -1;
};
beerbot.prototype._isMentioninghveitibjor = function (message) {
    return message.text.toLowerCase().indexOf('hveitibjór') > -1;
};
beerbot.prototype._isMentioningredale = function (message) {
    return message.text.toLowerCase().indexOf('red ale') > -1;
};
beerbot.prototype._isMentioningporter = function (message) {
    return message.text.toLowerCase().indexOf('porter') > -1;
};
beerbot.prototype._isMentioningcal = function (message) {
    return message.text.toLowerCase().indexOf('california common') > -1;
};

beerbot.prototype._replyWithinvite = function (originalMessage) {
var self = this;
self.db.get('SELECT * FROM options', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
            var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'Varstu með e-ð sérstakt í huga?, ég þekki ' + record.tegund,	{as_user: true});
     
    })
};

beerbot.prototype._replyWithwhatever = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn, type FROM beer ORDER BY RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og er af tegundinni ' + '*' + record.type + '*' + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};

beerbot.prototype._replyWithIPA = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="IPA" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};

beerbot.prototype._replyWithlager = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="Lager" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer +  '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._replyWithstout = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="Stout" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._replyWithpilsner = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="Pilsner" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._replyWithbarleywine = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="Barleywine" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._replyWithblonde = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="Blonde" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._replyWithhveitibjor = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="Hveitibjor" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._replyWithredale = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="Red Ale" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._replyWithporter = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="Porter" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._replyWithcal = function (originalMessage) {
    var self = this;
    self.db.get('SELECT ID, beer, desc, einkunn FROM beer WHERE type="California Common" ORDER BY  RANDOM() LIMIT 1', function (err, record){
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, 'beerbot mælir með ' + '*' + record.beer + '*' + ' sem er ' + record.desc + ' og fær ' + record.einkunn + ' í einkunn á Untappd.', {as_user: true});
     
    })
};
beerbot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};