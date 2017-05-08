import Snake from './snake.js';

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

export default Board;
