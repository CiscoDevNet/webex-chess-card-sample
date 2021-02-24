var jsChessEngine = require('js-chess-engine');
var chessCardTemplate = require('./chessCardTemplate');
const { move, aiMove, status, getFen } = jsChessEngine;
const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
var localBoard = null;

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
    let rank = '';
    let textBoard = '';

    '87654321'.split('').forEach(rank => {
        let textFile = rank + ' ';
        'ABCDEFGH'.split('').forEach((file, column) => {
            let square = '';
            if (rank & 1) {
                if (column & 1) square = '.'
                else square = '■'
            }
            else {
                if (column & 1) square = '■'
                else square = '.'
            }
            square = '|' + (board.pieces[file + rank] || square);
            textFile += square;
        });
        textFile += '|  \n\n';
        textBoard += textFile;
    });
    textBoard += '...a b c d e f g h';
    return textBoard;
}

exports.start = function () {
    localBoard = status(startPosition);
    textBoard = renderBoard(localBoard);
    let card = chessCardTemplate.template;
    card.body[0].columns[0].items[0].text = textBoard;
    card.body[4].value = startPosition;
    return card;
}

exports.move = function (fen, from, to) {
    currentBoard = move(status(fen), from.toUpperCase(), to.toUpperCase());
    cpuMove = aiMove(currentBoard, level = 2); //Intermediate
    from = Object.keys(cpuMove)[0];
    to = cpuMove[from];
    currentBoard = move(currentBoard, from, to);
    textBoard = renderBoard(currentBoard);
    let card = chessCardTemplate.template;
    card.body[0].columns[0].items[0].text = textBoard;
    let value = (currentBoard.turn == 'white') ? 'White' : 'Black';
    card.body[0].columns[1].items[0].columns[1].items[1].text = value;
    value = currentBoard.check ? '☑' : '☐';
    card.body[0].columns[1].items[0].columns[1].items[1].text = value;
    value = currentBoard.checkMate ? '☑' : '☐';
    card.body[0].columns[1].items[0].columns[1].items[2].text = value;
    value = currentBoard.castling.whiteLong ? '☑' : '☐';
    card.body[0].columns[1].items[2].columns[1].items[0].text = value;
    value = currentBoard.castling.whiteShort ? '☑' : '☐';
    card.body[0].columns[1].items[2].columns[1].items[1].text = value;
    value = currentBoard.castling.blackLong ? '☑' : '☐';
    card.body[0].columns[1].items[2].columns[1].items[2].text = value;
    value = currentBoard.castling.blackShort ? '☑' : '☐';
    card.body[0].columns[1].items[2].columns[1].items[3].text = value;
    value = getFen(currentBoard);
    card.body[4].value = value;
    localBoard = currentBoard;
    return card;
}

exports.moveText = function (from, to) {
    return exports.moveAction(localBoard, from, to);
}