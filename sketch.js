let GRID_SIZE = 20
let width = 500
let height = 500

let food
let snake

function setup() {
  createCanvas(width, height);
  frameRate(10)
  food = new Food()
  snake = new Snake()
}

class Snake {
  constructor() {
  this.body = [];
  this.body.push({x: width/2, y: height/2}); // the head of the snake
  this.dir = "up"; // dir=ection
  this.lastX = width/2;
  this.lastY = height/2;
  }
  
  display() {
    fill(0)
    for (let b of this.body) {
      rect(b.x, b.y, width / GRID_SIZE, height / GRID_SIZE)
    }
  }
  
  hasEatenFood() {
    if (this.body[0].x == food.x && this.body[0].y == food.y) {
      return true;     
    }
  }
  
  update() {
    this.lastX = this.body[this.body.length-1].x;     // track the last X and Y  
    this.lastY = this.body[this.body.length-1].y;     // so we can put the new body there
    for (let i = this.body.length-1; i >= 1; i--) {
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
      
      if (this.dir == "right") {
      this.body[0].x += width / GRID_SIZE;  
      } else if (this.dir == "down") {
      this.body[0].y += height / GRID_SIZE;
      } else if (this.dir == "left") {
      this.body[0].x -= width / GRID_SIZE;
      } else if (this.dir == "up") {
      this.body[0].y -= height / GRID_SIZE;
      }
      
    }
    
  }
  
  grow() {
    this.body.push({x: this.lastX, y: this.lastY});
  }
  
}

class Food {
  constructor() {
    this.spawn();
  }

  spawn() {
    let randX = random(0, width);
    let randY = random(0, height);
    this.x = randX - randX % (width / GRID_SIZE);
    this.y = randY - randY % (height / GRID_SIZE);
  }

  draw() {
    fill(255, 100, 100);
    rect(this.x, this.y, width / GRID_SIZE, height / GRID_SIZE);
  }
}

function keyPressed() {
  if (keyCode === 39 && snake.dir !== "left") {
    snake.dir = "right";
  } else if (keyCode === 40 && snake.dir !== "up") {
    snake.dir = "down";
  } else if (keyCode === 37 && snake.dir !== "right") {
    snake.dir = "left";
  } else if (keyCode === 38 && snake.dir !== "down") {
    snake.dir = "up";
  } 
}

function draw() {
  background(155, 204, 153)
  for (let x = 0; x < width; x += width / GRID_SIZE) {
    for (let y = 0; y < height; y += height / GRID_SIZE) {
        stroke(255);
        strokeWeight(1);
        line(x, 0, x, height);
        line(0, y, width, y);
    }
  }

  if (snake.hasEatenFood()) {   // add this code
    food.spawn();
  }
  
  food.draw()
  snake.update();
  snake.display();
}