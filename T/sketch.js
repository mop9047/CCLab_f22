let stars = [];
let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  c1 = color(32, 0, 51);
  c2 = color(81, 0, 164);
  c3 = color(0, 137, 194);
  c4 = color(11, 0, 45);
  c5 = color(10, 43, 155);
  
  for (let i = 0; i < 10; i++) {
    balls[i] = new Ball(width*0.13,0.66*height);
  }

  for (let i = 0; i < 250; i++) {
    stars.push(new particle(random(width), random(height)));
  }
}

function draw() {
  background(220);

  for (x = 0; x < height *3/ 8; x=x+0.5) {
    colo = map(x, 0, height *3/ 8, 0, 1);
    colon = lerpColor(c1, c2, colo);
    kolon = lerpColor(c2, c3, colo);

    stroke(colon);
    line(0, x, width, x);
    stroke(kolon);
    line(0, x+height*3 / 8, width, x+height*3 / 8);
  }
  
  noStroke();
  push();
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
    stars[i].update();
  }
  
  // Planet outer shadow
  for (x = 60; x > 0; x--) {
    stroke(64, 241, 241, x);
    noFill();
    strokeWeight(3);
    ellipse(width / 2, (2 / 3) * height, height/2-x+50);
  }
  pop();
  
  ellipse(width / 2, (2 / 3) * height, height/2);
  rect(600, 700, 1200, 200);
  push()
  
  fill(13,26,90)
  beginShape();
  vertex(0,height)
  let xoff = 0;
  for (let x = 0; x < width; x++) {
    let y = (noise(xoff+30) * 250) + (sin(10*xoff) * height / 100)+(height*0.4);
    vertex(x, y);

    xoff += 0.01;
  }
  vertex(width,height)
  endShape();
  
  for (x = 60; x > 0; x--) {
    stroke(11, 141, 200, x);
    noFill();
    strokeWeight(3);
    line(0,(height*5.5/8)+x,width,(height*5.5/8)+x);
  }
  
  fill(13,26,108)
  beginShape();
  vertex(0,height)
  let zoff = 0;
  for (let x = 0; x < width; x++) {
    let y = (noise(zoff) * 250) + (sin(10*zoff) * height / 100)+(height*0.5);
    vertex(x, y);

    zoff += 0.01;
  }
  vertex(width,height)
  endShape();
  
  fill(0)
  beginShape();
  vertex(0,height)
  let koff = 0;
  for (let x = 0; x < width; x++) {
    let y = (noise(koff) * 10) + (sin(koff+100) * height / 100000)+(height*0.735);
    vertex(x, y);

    koff += 0.01;
  }
  vertex(width,height)
  endShape();
  
  //gradient ground
  for (x = height*3/4; x < height; x=x+0.5) {
    colo = map(x, height*3/4, height, 0, 1);
    colon = lerpColor(c5, c4, colo);
    stroke(colon)
    line(0,x,width,x)
   }
  pop()
  
  //manual mountain
  fill(15,6,59)
  beginShape()
  vertex(width*0.29,height*0.85)
  vertex(width*0.21,height*0.67)
  vertex(width*0.11,height*0.59)
  vertex(width*0.08,height*0.27)
  vertex(width*0.03,height*0.15)
  vertex(width*0,height*0.13)
  vertex(width*0,height)
  vertex(width*0.37,height)
  endShape()
  
  //manual mountain
  beginShape()
  vertex(width*0.69,height*0.85)
  vertex(width*0.77,0.55*height)
  vertex(width*0.83,0.47*height)
  vertex(width*0.88,0.48*height)
  vertex(width*0.90,0.65*height)
  vertex(width*0.91,0.67*height)
  vertex(width*0.92,0.70*height)
  vertex(width*0.95,0.89*height)
  vertex(width*0.78,0.89*height)
  endShape()
  
  //holes
  push()
  fill(244,115,178,random(220,250))
  triangle(width*0.83,0.69*height,width*0.86,0.68*height,width*0.84,0.71*height)
  triangle(width*0,0.17*height,width*0,0.14*height,width*0.02,0.15*height)
  triangle(width*0.77,0.55*height,width*0.82,0.49*height,width*0.81,0.54*height)
  triangle(width*0.11,0.62*height,width*0.19,0.68*height,width*0.12,0.69*height)
  
  if (mouseIsPressed){
    if(mouseX>width*0.1 && mouseX<width*0.18 && mouseY>height*0.62 && mouseY<height*0.69){
      balls.push(new Ball(width*0.13,0.66*height))
    }
    if(mouseX>width*0.77 && mouseX<width*0.81 && mouseY>height*0.49 && mouseY<height*0.54){
      balls.push(new Ball(width*0.8,0.53*height))
    }
    if(mouseX>width*0.82 && mouseX<width*0.85 && mouseY>height*0.68 && mouseY<height*0.71){
      balls.push(new Ball(width*0.84,0.70*height))
    }
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
    balls[i].checkCanvas();
  }
  
  for(let i = balls.length -1;i>=0;i--){
    if(balls[i].isDone == true){
      balls.splice(i,1)
    }
  }
  
  //white holes 
  fill(244,226,229)
  
  triangle(width*0.113,0.64*height,width*0.16,0.684*height,width*0.12,0.69*height)
  
  triangle(width*0.79,0.545*height,width*0.815,0.51*height,width*0.81,0.54*height)
  
 triangle(width*0.835,0.7*height,width*0.853,0.69*height,width*0.84,0.71*height)
  pop()
  
  
  console.log(int(100*mouseX/windowWidth),int(100*mouseY/windowHeight))
}

class particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.scale = random(1,4)
  }
  update() {
    fill(240,random(100,240),240)
  }
  display() {
    ellipse(this.x, this.y, this.scale*random());
  }
}

class Ball {
  //property
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(5, 20);
    this.xSpd = random(-2, 2);
    this.ySpd = random(-2, 2);
    this.isDone = false;
  }

  
  checkCanvas(){
    
    if(height*0.66-this.y >= 200){
      this.isDone = true;
  }}
  //how does it move, behaviors
  move() {
    this.x += this.xSpd + random(-2,2);
    this.y += this.ySpd -5;
  }

  //how this ball looks like
  display() {
    noStroke()
    fill(250,200)
    ellipse(this.x, this.y, this.dia, this.dia);
    
    for (this.r = 0; this.r < 10; this.r++) {
      this.w = map(this.r,0,10,20,0)
    stroke(244,115,178, this.w);
    noFill();
    strokeWeight(5);
      
    ellipse(this.x, this.y, this.dia+this.r);
  }
  }
}

