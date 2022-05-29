
var MINE_IMG = '<img src="img/mine.png" />';
var FLAG_IMG = '<img src="img/flag.png" />';

var gBoard
var gSize
var countStep
var flag = false
var time = 0

var elsmiley1 = document.querySelector('.smiley-1')
var elsmiley2 = document.querySelector('.smiley-2')
var elsmiley3 = document.querySelector('.smiley-3')


function levelSelection(level) {
	firstStep = 0
	if (level === 1) gSize = 4
	else if (level === 2) gSize = 8
	else gSize = 12
	initGame()
	return gSize
}

function initGame() {
	countStep = 0
	time = 0
	gBoard = buildBoard();
	renderBoard(gBoard);
	document.querySelector('.gameover').style.display = 'none'
	document.querySelector('.win').style.display = 'none'

	elsmiley1.style.display = 'block'
	elsmiley2.style.display = 'none'
	elsmiley3.style.display = 'none'
}

function buildBoard() {
	var board = createMat(gSize)
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board.length; j++) {
			var cell = { isShown: false };
			board[i][j] = cell;
		}
	}
	return board
}

function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>';

		for (var j = 0; j < board.length; j++) {
			var cellClass = getClassName({ i, j })

			if (board[i][j].mine) {
				strHTML += '\t<td class=" cell ' + cellClass
					+ '" onclick="cellClicked(' + i + ',' + j +
					')" oncontextmenu="rightClick(' + i + ',' + j + ')"> <span class="'
					+ cellClass + '">' + MINE_IMG + '</span> <span class="F'
					+ cellClass + '">' + FLAG_IMG + '</span>\n';
			} else {
				strHTML += '\t<td class=" cell ' + cellClass
					+ '" onclick="cellClicked(' + i + ',' + j +
					')" oncontextmenu="rightClick(' + i + ',' + j + ')"> <span class="'
					+ cellClass + '">' + setMinesNegsCount(i, j, board) + '</span> <span class="F'
					+ cellClass + '">' + FLAG_IMG + '</span>\n';
			}
			strHTML += '</td>';
		}
		strHTML += '</tr>';
	}
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function cellClicked(i, j) {
	if (countStep === 0) {
		placeMines(gBoard)
		timer()
	}
	countStep++
	var elFlag = document.querySelector('span.Fcell-' + i + '-' + j)
	elFlag.style.display = 'none'
	var el = document.querySelector('span.cell-' + i + '-' + j)
	el.style.display = 'block'
	if (gBoard[i][j].mine) gameOver()
	if (countStep === gSize ** 2 - gSize ** 2 / 8) win()
}

function placeMines(board) {
	for (var i = 0; i < board.length ** 2 / 8; i++) {
		var row = getRandomInt(0, board.length)
		var col = getRandomInt(0, board.length)
		if (board[row][col].mine) i--
		board[row][col] = { isShown: false, mine: true }
	}
	firstStep = 1
	gBoard = board
	renderBoard(board);
}

function setMinesNegsCount(cellI, cellJ, mat) {
	var mainesCount = 0;
	for (var i = cellI - 1; i <= cellI + 1; i++) {
		if (i < 0 || i >= mat.length) continue;
		for (var j = cellJ - 1; j <= cellJ + 1; j++) {
			if (i === cellI && j === cellJ) continue;
			if (j < 0 || j >= mat.length) continue;

			if (mat[i][j].mine) mainesCount++;
		}
	}
	return mainesCount;
}

function rightClick(i, j) {
	flag = !flag
	var el = document.querySelector('span.Fcell-' + i + '-' + j)
	el.style.display = (flag) ? 'block' : 'none'
}

function gameOver() {
	elsmiley1.style.display = 'none'
	elsmiley2.style.display = 'block'
	document.querySelector('.gameover').style.display = 'block'
	
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard.length; j++) {
			var el = document.querySelector('span.cell-' + i + '-' + j)
			el.style.display = 'block'



		}
	}
}

function win() {
	elsmiley1.style.display = 'none'
	elsmiley3.style.display = 'block'
	document.querySelector('.win').style.display = 'block'
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard.length; j++) {
			var el = document.querySelector('span.cell-' + i + '-' + j)
			el.style.display = 'block'
		}
	}
}

function timer() {
setInterval (count, 1000)

}

function count() {
	time++
	document.querySelector('.timer span').innerHTML = time
}
