var jsChessEngine = require('js-chess-engine');
const { move, aiMove, status } = jsChessEngine;
const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
var currentBoard = null;

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

function renderBoard(board){
    let rank = '';
    let textBoard = '';

    '87654321'.split('').forEach(rank=>{
        let textFile=rank+' ';
        'ABCDEFGH'.split('').forEach((file,column)=>{
            let square = '';
            if (rank & 1){
                if (column & 1) square='_'
                else square='#' 
            }
            else {
                if (column & 1) square='#'
                else square='_'                 
            }
            square = '|' + (board.pieces[file+rank] || square);
            textFile+=square;
        });
        textFile+='|  \n\n';
        textBoard+=textFile;
    });
    textBoard+='   a b c d e f g h';
    return textBoard;
}

exports.start = function(){
    currentBoard=status(startPosition);
    return renderBoard(currentBoard);
}

exports.move = function(from,to) {
    currentBoard=move(currentBoard,from.toUpperCase(),to.toUpperCase());
    cpuMove=aiMove(currentBoard, level = 2); //Intermediate
    from=Object.keys(cpuMove)[0];
    to=cpuMove[from];
    currentBoard=move(currentBoard,from,to);
    return renderBoard(currentBoard);
}