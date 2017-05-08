/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Snake {
  constructor(board){
    this.board = board;
    this.direction = "N";
    this.score = 0;
    this.headPos = [Math.floor(this.board.size/2), Math.floor(this.board.size/2)];
    this.segments = [this.headPos];
    this.board.grid[this.headPos[0]][this.headPos[1]] = "snake";
    this.ords = { "N": [-1, 0], "E": [0,1], "W": [0,-1], "S": [1,0]};
  }

  move(){
    this.headPos = this.addCoords(this.headPos, this.ords[this.direction]);

    if(this.checkCollisions(this.headPos)){
      this.segments.forEach( pos => {
        this.board.grid[pos[0]][pos[1]] = null;
      });
      this.segments = [this.headPos];
    }

    if(!this.checkAteApple(this.headPos)){
      const tailPos = this.segments.pop();
      this.board.grid[tailPos[0]][tailPos[1]] = null;
    } else {
      this.board.addRandomApples(1);
    }
    this.segments.unshift(this.headPos);
    this.segments.forEach( pos => {
      this.board.grid[pos[0]][pos[1]] = "snake";
    });

    this.score = (this.segments.length * 100) - 100;
  }

  turn(newDirection){
    if(newDirection === 'N' && this.direction === 'S'){
      return;
    } else if (newDirection === 'E' && this.direction === 'W'){
      return;
    }
    this.direction = newDirection;
  }

  addCoords(pos1, pos2){
    let newY = pos1[0] + pos2[0];
    if (newY > this.board.size - 1){
      newY = 0;
    } else if (newY < 0){
      newY = this.board.size - 1;
    }

    let newX = pos1[1] + pos2[1];
    if (newX > this.board.size - 1){
      newX = 0;
    } else if (newX < 0){
      newX = this.board.size - 1;
    }
    return [newY,  newX];
  }

  checkAteApple(pos){
    return this.board.grid[pos[0]][pos[1]] === "apple";
  }

  checkCollisions(pos){
    return this.board.grid[pos[0]][pos[1]] === "snake";
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Snake);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__snake_js__ = __webpack_require__(0);



class SnakeGame {
  constructor(el){
    this.el = el;
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */]();
    this.board.generateBoard();
    this.snake = new __WEBPACK_IMPORTED_MODULE_1__snake_js__["a" /* default */](this.board);
    this.board.addRandomApples(3);
    this.score = 0;
    this.moveSnakeAndRender = this.moveSnakeAndRender.bind(this);
    setInterval( this.moveSnakeAndRender, 75);
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleKeyPress(e){
    switch(e.keyCode){
      case 38: {
        this.snake.turn("N");
        break;
      }
      case 37: {
        this.snake.turn("W");
        break;
      }
      case 40: {
        this.snake.turn("S");
        break;
      }
      case 39: {
        this.snake.turn("E");
        break;
      }
    }
  }

  moveSnakeAndRender(){
    this.snake.move();
    this.renderBoard();
    this.score = (this.snake.segments.length * 100) - 100;
  }

  renderBoard(){

    const score = $l('#score').html(`Score: ${this.score}`);
    this.el.empty();
    this.board.grid.forEach( row => {
      const $row_ul = $l(document.createElement('ul'));
      $row_ul.addClass("grid-row");
      row.forEach( cell => {
        const $li = $l(document.createElement('li'));
        $li.addClass("grid-cell");

        if(cell === "snake") {
          $li.addClass("snake");
        } else if(cell === "apple") {
          $li.addClass("apple");
        }
        $row_ul.append($li);
      });
      this.el.append($row_ul);
    });
    console.log(this.el.elArray.length)
  }

  // createBoard(){
  //
  //   const score = $l('#score').html(`Score: ${this.score}`);
  //
  //   this.el.empty();
  //   const $grid_ul = $l(document.createElement('ul'));
  //   $grid_ul.addClass("snake-grid");
  //   this.board.grid.forEach( row => {
  //     const $row_ul = $l(document.createElement('ul'));
  //     $row_ul.addClass("grid-row");
  //     row.forEach( cell => {
  //       const $li = $l(document.createElement('li'));
  //       $li.addClass("grid-cell");
  //
  //       if(cell === "snake") {
  //         $li.addClass("snake");
  //       } else if(cell === "apple") {
  //         $li.addClass("apple");
  //       }
  //
  //       $row_ul.append($li);
  //     });
  //     $grid_ul.append($row_ul);
  //   });
  //   this.el.append($grid_ul);
  // }
}

/* harmony default export */ __webpack_exports__["a"] = (SnakeGame);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snake_js__ = __webpack_require__(0);


class Board {
  constructor(size = 25){
    this.size = size;
    this.grid = [];
  }

  generateBoard(){
    for(let i = 0; i < this.size; i++){
      this.grid[i] = [];
      for(let j = 0; j < this.size; j++){
        this.grid[i][j] = null;
      }
    }
  }

  addRandomApples(num){
    for(let i = 0; i < num; i ++){
      let posX = Math.floor(Math.random() * this.size);
      let posY = Math.floor(Math.random() * this.size);
      while(this.grid[posX][posY] !== "apple"){
        if(this.grid[posX][posY] === null){
          this.addToCell(posX, posY, "apple");
        } else {
          posX = Math.floor(Math.random() * this.size);
          posY = Math.floor(Math.random() * this.size);          
        }
      }
    }
  }

  addToCell(x, y, el){
    this.grid[x][y] = el;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snake_game_js__ = __webpack_require__(1);


$l(() => {
  const root = $l('.snake-game');
  new __WEBPACK_IMPORTED_MODULE_0__snake_game_js__["a" /* default */](root);
});


/***/ })
/******/ ]);