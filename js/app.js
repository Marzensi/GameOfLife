document.addEventListener("DOMContentLoaded", function () {

    var playBtn = document.getElementById('play');
    var pauseBtn = document.getElementById('pause');
    var interval;


    var inputWidth = document.querySelector('.input-width');
    var inputHeight = document.querySelector('.input-height');
    inputWidth.setAttribute('placeholder', 'minimum 20');
    inputHeight.setAttribute('placeholder', 'minimum 20');


    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;


        this.createBoard = function () {
            var board = document.getElementById('board');

            board.style.width = boardWidth * 10 + 'px';
            board.style.height = boardHeight * 10 + 'px';

            var allCells = this.width * this.height;
            //console.log(allCells);

            for (var i=0; i<allCells; i++) {
                var newDiv = document.createElement('div');
                board.appendChild(newDiv);
            }
            this.cells = [];
            this.cells = document.querySelectorAll('#board > div');
            //console.log(this.cells);

            for (var i = 0; i < this.cells.length; i++) {
                this.cells[i].addEventListener('click', function () {
                    this.classList.toggle('live');
                })
            }
        }
    }

    GameOfLife.prototype.indicateCell = function(x, y){
        var cell = this.cells[x + y * this.width];
        return cell;
    };

   GameOfLife.prototype.setCellState = function(x, y, state) {
        var index = x + y * this.width;
        if (state === 'live') {
            this.cells[index].classList.add('live');
        }else {
            this.cells[index].classList.remove('live');
        }
   };

    GameOfLife.prototype.firstGlider = function() {
        this.setCellState(10, 10, 'live');
        this.setCellState(10, 11, 'live');
        this.setCellState(11, 12, 'live');
        this.setCellState(11, 10, 'live');
        this.setCellState(12, 10, 'live');
        this.setCellState(2, 6, 'live');
        this.setCellState(2, 7, 'live');
        this.setCellState(3, 7, 'live');
        this.setCellState(4, 9, 'live');
        this.setCellState(4, 8, 'live');
        this.setCellState(4, 7, 'live');
        this.setCellState(10, 9, 'live');
        this.setCellState(11, 9, 'live');
        this.setCellState(12, 9, 'live');
        this.setCellState(13, 10, 'live');
        this.setCellState(13, 11, 'live');
        this.setCellState(14, 11, 'live');
        this.setCellState(14, 10, 'live');
        this.setCellState(15, 8, 'live');
        this.setCellState(16, 9, 'live');
        this.setCellState(16, 10, 'live');
        this.setCellState(17, 11, 'live');
        this.setCellState(17, 12, 'live');
        this.setCellState(17, 13, 'live');
        this.setCellState(18, 13, 'live');
    };


    GameOfLife.prototype.computeCellNextState = function(x, y) {

        var neighbours = [];
        var counter = 0;

        neighbours.push(this.cells[(x + 1) + y * this.width]);
        neighbours.push(this.cells[(x - 1) + y * this.width]);
        neighbours.push(this.cells[x + (y + 1) * this.width]);
        neighbours.push(this.cells[x + (y -1) * this.width]);
        neighbours.push(this.cells[(x + 1) + (y + 1) * this.width]);
        neighbours.push(this.cells[(x + 1) + (y - 1) * this.width]);
        neighbours.push(this.cells[(x - 1) + (y + 1) * this.width]);
        neighbours.push(this.cells[(x - 1) + (y - 1) * this.width]);

        for(var i = 0; i < neighbours.length; i++){
            if (typeof neighbours[i] !== 'undefined' && neighbours[i].className === 'live') {
                counter++;
            }
        }

        if (counter < 2 || counter > 3){
            //this.cells[x + y * this.width].classList.remove('live');
            return 0;
        }else if (counter === 2 || counter === 3){
            if (this.cells[x + y * this.width].className === 'live') {
                return 1;
            }else {
                return 0;
            }
        }else if (counter === 3 && this.cells[x + y * this.width].className !== 'live'){
            //this.cells[x + y * this.width].classList.add('live');
            return 1;
        }
    };

    GameOfLife.prototype.computeNextGeneration = function() {
        var newBoard = [];

        for(var i = 0; i < this.width; i++) {
            for(var j = 0; j < this.height; j++) {
                newBoard.push(this.computeCellNextState(i, j));
            }
        }
        return newBoard;
    };

    GameOfLife.prototype.printNextGeneration = function() {
        var newBoardArr = this.computeNextGeneration();
        for(var i = 0; i < this.cells.length; i++) {
            if (newBoardArr[i] === 1) {
                this.cells[i].classList.add('live');
            } else {
                this.cells[i].classList.remove('live');
            }
        }
    };

    var createBoardBtn = document.querySelector('.createBoardBtn');
        createBoardBtn.addEventListener('click', function () {
        var game = new GameOfLife(Number(inputWidth.value), Number(inputHeight.value));

        game.createBoard();
        game.firstGlider();

        playBtn.addEventListener('click', function () {
            interval = setInterval(function () {
            game.printNextGeneration()
            }, 250);

            pauseBtn.addEventListener('click', function () {
                clearInterval(interval);
            });
        });
    });
});