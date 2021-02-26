const jsChessEngine = require('js-chess-engine');
const { move, aiMove, status, getFen } = jsChessEngine;
const chessCardTemplate = require('./chessCardTemplate');

// FEN (Forsyth-Edwards) chess notation for the opening board
const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
var localBoard;

// Board layout
// 8 |_|#|_|#|_|#|_|#|
// 7 |#|_|#|_|#|_|#|_|
// 6 |_|#|_|#|_|#|_|#|
// 5 |#|_|#|_|#|_|#|_|
// 4 |_|#|_|#|_|#|_|#|
// 3 |#|_|#|_|#|_|#|_|
// 2 |_|#|_|#|_|#|_|#|
// 1 |#|_|#|_|#|_|#|_|
//    a b c d e f g h

function renderBoard(board) {
    // let rank = '';
    let textBoard = '';

    '87654321'.split('').forEach(rank => {
        let textRank = rank + ' ';
        'ABCDEFGH'.split('').forEach((file, column) => {
            let square = '';
            if (parseInt(rank) & 1) square = (column & 1) ? '.' : '■'
            else square = (column & 1) ? '■' : '.'
            square = '|' + (board.pieces[file + rank] || square);
            textRank += square;
        });
        textRank += '|  \n\n';
        textBoard += textRank;
    });
    textBoard += '...a b c d e f g h';
    return textBoard;
}

exports.start = function () {
    localBoard = status(startPosition);
    let card = chessCardTemplate.template;
    card.body[0].columns[0].items[0].text = renderBoard(localBoard);
    card.body[4].value = startPosition;
    return card;
}

exports.move = function (fen, from, to) {
    let currentBoard = status(fen);
    let card = chessCardTemplate.template;
    let statusMessage;

    try {
        currentBoard = move(status(fen), from.toUpperCase(), to.toUpperCase());
        let cpuMove = aiMove(currentBoard, level = 2); //Intermediate
        [from, to] = Object.entries(cpuMove)[0];
        currentBoard = move(currentBoard, from, to);
        statusMessage = `-> Black moves: ${from} ${to}`;
    }
    catch (err) {
        statusMessage = `-> Invalid move: ${from} ${to}`;
    }

    // Update card displayable values to reflect the current board state
    card.body[0].columns[0].items[0].text = renderBoard(currentBoard);
    card.body[0].columns[0].items[1].text = statusMessage;
    card.body[0].columns[1].items[0].columns[1].items[0].text = (currentBoard.turn == 'white') ? 'White' : 'Black';
    card.body[0].columns[1].items[0].columns[1].items[1].text = currentBoard.check ? '☑' : '☐';
    card.body[0].columns[1].items[0].columns[1].items[2].text = currentBoard.checkMate ? '☑' : '☐';
    card.body[0].columns[1].items[2].columns[1].items[0].text = currentBoard.castling.whiteLong ? '☑' : '☐';
    card.body[0].columns[1].items[2].columns[1].items[1].text = currentBoard.castling.whiteShort ? '☑' : '☐';
    card.body[0].columns[1].items[2].columns[1].items[2].text = currentBoard.castling.blackLong ? '☑' : '☐';
    card.body[0].columns[1].items[2].columns[1].items[3].text = currentBoard.castling.blackShort ? '☑' : '☐';

    // Store the current full board config in FEN notation into the hidden key 'currentBoard'
    card.body[4].value = getFen(currentBoard);
    localBoard = currentBoard;
    return card;
}

exports.moveText = function (from, to) {
    return exports.moveAction(localBoard, from, to);
}