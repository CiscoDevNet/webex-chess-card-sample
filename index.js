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

// say hello
framework.hears('hello', (bot, trigger) => {
    bot.say(`Hello ${trigger.person.displayName}!  Say "new" to start a new game of chess`,);
});

// Start a new game
framework.hears('new', (bot, trigger) => {
    bot.sendCard(chess.start(), "Sorry, it appears your client cannot render adaptive card attachments");
});

// Handle input coming in from an adaptive card 'Submit' action
framework.on('attachmentAction', async (bot, trigger) => {
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
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', () => {
    console.log('stopping...');
    server.close();
    framework.stop().then(() => {
        process.exit();
    });
});
