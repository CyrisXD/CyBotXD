// This is the cleanup version
// Extra
var http = require('http');

var Bot = require('./bot'),
    config1 = require('././node_modules/twit/config1');

var bot = new Bot(config1);

console.log("Bot Running!");

var streams = bot.twit.stream('statuses/filter', {
    track: '@CyBotXD'
});

var myDate = new Date();


streams.on('limit', function(limitMessage) {
    bot.twit.post('statuses/update', {
        status: "@CyrisXD " + "Limited " + myDate
    }, function(err, reply) {});
});

streams.on('warning', function(warning) {
    bot.twit.post('statuses/update', {
        status: "@CyrisXD " + "Warning " + myDate
    }, function(err, reply) {});
});


streams.on('reconnect', function(request, response, connectInterval) {
    bot.twit.post('statuses/update', {
        status: "@CyrisXD " + "Reconnected " + myDate
    }, function(err, reply) {});
});

streams.on('connect', function(request) {
    //bot.twit.post('statuses/update', { status: "@CyrisXD" + " I am reconnected" }, function (err, reply) { });
    console.log("CONNECTED" + myDate);
    bot.twit.post('statuses/update', {
        status: "@CyrisXD " + "Online! " + myDate
    }, function(err, reply) {});


});

streams.on('disconnect', function(disconnectMessage) {
    //bot.twit.post('statuses/update', { status: "@CyrisXD" + " I was disconnected" }, function (err, reply) { });
    console.log("DISCONNECTED" + myDate);
    stream.start()
    bot.twit.post('statuses/update', {
        status: "@CyrisXD " + "Disconnected " + myDate
    }, function(err, reply) {});
});


streams.on('tweet', function(tweet) {
    console.log("Tweet Log");
    screenName = tweet.user.screen_name;
    question = tweet.text.replace("@CyBotXD", "");

    var options = {
        host: 'botsta.com',
        port: 80,
        path: '/api.php' + question
    };

    console.log(question);
    http.get("http://botsta.com/api.php?input=" + question, function(resp) {
        resp.setEncoding('utf8');
        resp.on('data', function(chunk) {
            answer = chunk;
            bot.twit.post('statuses/update', {
                status: "@" + screenName + " " + answer
            }, function(err, reply) {});
        });

    }).on("error", function(e) {
        console.log("Got error: " + e.message);
    });
});




function handleError(err) {
    console.error('response status:', err.statusCode);
    console.error('data:', err.data);
}
