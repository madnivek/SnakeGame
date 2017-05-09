# Snake Demo
## Created using the DOMQuery library.

[Live Game](http://kevin-dam.co/SnakeGame)

[DOMQuery Github](https://github.com/madnivek/DOMQuery)

This Snake game uses DOMQuery to render HTML elements that form a snake grid and apply class attributes to these elements. These class elements are then used to color the individual cells based on where the Snake or Apples are located.

#### Core Components:

`renderBoard` method:

```javascript
renderBoard(){

  //Select the score element, and change it's inner HTML
  $l('#score').html(`Score: ${this.score}`);

  //Clear the previous board
  this.el.empty();

  //Iterate through the game board, create HTML elements, add necessary class attributes, and append it to the root HTML element
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
}
```

Event handling is added to the HTML document object using `on`.

```javascript
  constructor(){
    ...
    $l('body').on('keydown', this.handleKeyPress.bind(this));
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
```
