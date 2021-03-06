var Framework = require('webex-node-bot-framework');
const fetch = require('node-fetch');

var chess = require('./chess');

// Load process.env values from .env file
require('dotenv').config();

// framework options
var config = {
    token: process.env.WEBEX_ACCESS_TOKEN
};

// init framework
var framework = new Framework(config);
framework.start();

var responded = false;

// say hello
framework.hears('hello', function (bot, trigger) {
    bot.say(`Hello ${trigger.person.displayName}!  Say "new" to start a new game of chess`,);
    responded = true;
});

// Its a good practice to handle unexpected input
framework.hears(/.*/gim, function (bot, trigger) {
    if (!responded) {
        bot.say('Sorry, I don\'t know how to respond to "%s"', trigger.message.text);
    }
    responded = false;
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

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function () {
    console.log('stopping...');
    server.close();
    framework.stop().then(function () {
        process.exit();
    });
});
