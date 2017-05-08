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

export default Snake;
