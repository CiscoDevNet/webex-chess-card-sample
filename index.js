var Framework = require('webex-node-bot-framework');
var webhook = require('webex-node-bot-framework/webhook');
const fetch = require('node-fetch');

var chess = require('./chess');

// Load process.env values from .env file
require('dotenv').config();

if (!process.env.WEBEX_ACCESS_TOKEN) {
    console.log('\n-->Token missing: please provide a valid Webex Teams user or bot access token in .env or via WEBEX_ACCESS_TOKEN environment variable');
    process.exit(1);
}

// framework options
var config = {
    token: process.env.WEBEX_ACCESS_TOKEN
};

// init framework
var framework = new Framework(config);
framework.start();

// An initialized event means your webhooks are all registered and the 
// framework has created a bot object for all the spaces your bot is in
framework.on("initialized", function () {
    framework.debug("Framework initialized successfully! [Press CTRL-C to quit]");
});

// A spawn event is generated when the framework finds a space with your bot in it
// You can use the bot object to send messages to that space
// The id field is the id of the framework
// If addedBy is set, it means that a user has added your bot to a new space
// Otherwise, this bot was in the space before this server instance started
framework.on('spawn', function (bot, id, addedBy) {
    if (!addedBy) {
        // don't say anything here or your bot's spaces will get 
        // spammed every time your server is restarted
        framework.debug(`Framework created an object for an existing bot in a space called: ${bot.room.title}`);
    } else {
        // addedBy is the ID of the user who just added our bot to a new space, 
        // Say hello, and tell users what you do!
        bot.say('Hi there, you can say hello to me.  Don\'t forget you need to mention me in a group space!');
    }
});

var responded = false;

// say hello
framework.hears('hello', function (bot, trigger) {
    bot.say(`Hello ${trigger.person.displayName}!  Say "new" to start a new game of chess`,);
    responded = true;
});

// Start a new game
framework.hears(/^new$/, function (bot, trigger) {
    bot.sendCard(chess.start(), "Sorry, it appears your client cannot render adaptive card attachments");
    responded = true;
});

framework.hears('move', function (bot, trigger) {
    let from = trigger.args[1];
    let to = trigger.args[2]

    bot.sendCard(chess.moveText(null, trigger.args[1], trigger.args[2]), "Sorry, it appears your client cannot render adaptive card attachments");
    responded = true;
});

framework.on('attachmentAction', async function (bot, trigger) {
    let from = trigger.attachmentAction.inputs.moveFrom;
    let to = trigger.attachmentAction.inputs.moveTo;
    let currentBoard = trigger.attachmentAction.inputs.currentBoard;

    let newMessage = {
        parentId: trigger.attachmentAction.messageId,
        roomId: trigger.attachmentAction.roomId,
        text: "Sorry, it appears your client cannot render adaptive card attachments",
        attachments: [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": chess.move(currentBoard, from, to)
            }
        ]
    };

    const response = await fetch(`https://webexapis.com/v1/messages/${trigger.attachmentAction.messageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WEBEX_ACCESS_TOKEN}`
        },
        body: JSON.stringify(newMessage)
    });
    console.log(response);

    responded = true;
})

// Its a good practice to handle unexpected input
framework.hears(/.*/gim, function (bot, trigger) {
    if (!responded) {
        bot.say('Sorry, I don\'t know how to respond to "%s"', trigger.message.text);
    }
    responded = false;
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function () {
    framework.debug('stoppping...');
    server.close();
    framework.stop().then(function () {
        process.exit();
    });
});
