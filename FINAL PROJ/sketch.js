
let sketch = function (p) {
  let stars = [];
  let balls = [];

  class particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.scale = p.random(1, 4);
    }
    update() {
      p.fill(240, p.random(100, 240), 240);
    }
    display() {
      p.ellipse(this.x, this.y, this.scale * p.random());
    }
  }

  class Ball {
    //property
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.dia = p.random(5, 20);
      this.xSpd = p.random(-2, 2);
      this.ySpd = p.random(-2, 2);
      this.isDone = false;
    }

    checkCanvas() {
      if (p.height * 0.66 - this.y >= 300) {
        this.isDone = p.true;
      }
    }
    //how does it move, behaviors
    move() {
      this.x += this.xSpd + p.random(-2, 2);
      this.y += this.ySpd - 5;
    }

    //how this ball looks like
    display() {
      p.noStroke();
      p.fill(250, 200);
      p.ellipse(this.x, this.y, this.dia, this.dia);

      for (this.r = 0; this.r < 10; this.r++) {
        this.w = p.map(this.r, 0, 10, 20, 0);
        p.stroke(244, 115, 178, this.w);
        p.noFill();
        p.strokeWeight(5);

        p.ellipse(this.x, this.y, this.dia + this.r);
      }
    }
  }

  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("canvasContainer");
    p.rectMode(p.CENTER);
    c1 = p.color(32, 0, 51);
    c2 = p.color(81, 0, 164);
    c3 = p.color(0, 137, 194);
    c4 = p.color(11, 0, 45);
    c5 = p.color(10, 43, 155);

    for (let i = 0; i < 10; i++) {
      balls[i] = new Ball(p.width * 0.13, 0.66 * p.height);
    }

    for (let i = 0; i < 250; i++) {
      stars.push(new particle(p.random(p.width), p.random(p.height)));
    }
  };

  p.draw = function () {
    p.background(220);

    for (x = 0; x < (p.height * 3) / 8; x = x + 0.5) {
      colo = p.map(x, 0, (p.height * 3) / 8, 0, 1);
      colon = p.lerpColor(c1, c2, colo);
      kolon = p.lerpColor(c2, c3, colo);

      p.stroke(colon);
      p.line(0, x, p.width, x);
      p.stroke(kolon);
      p.line(0, x + (p.height * 3) / 8, p.width, x + (p.height * 3) / 8);
    }

    p.noStroke();
    p.push();
    for (let i = 0; i < stars.length; i++) {
      stars[i].display();
      stars[i].update();
    }

    // Planet outer shadow
    for (x = 60; x > 0; x--) {
      p.stroke(64, 241, 241, x);
      p.noFill();
      p.strokeWeight(3);
      p.ellipse(p.width / 2, (2 / 3) * p.height, p.height / 2 - x + 50);
    }
    p.pop();

    p.ellipse(p.width / 2, (2 / 3) * p.height, p.height / 2);
    p.rect(600, 700, 1200, 200);
    p.push();

    p.fill(13, 26, 90);
    p.beginShape();
    p.vertex(0, p.height);
    let xoff = 0;
    for (let x = 0; x < p.width; x++) {
      let y =
        p.noise(xoff + 30) * 250 +
        (p.sin(10 * xoff) * p.height) / 100 +
        p.height * 0.4;
      p.vertex(x, y);

      xoff += 0.01;
    }
    p.vertex(p.width, p.height);
    p.endShape();

    for (x = 60; x > 0; x--) {
      p.stroke(11, 141, 200, x);
      p.noFill();
      p.strokeWeight(3);
      p.line(0, (p.height * 5.5) / 8 + x, p.width, (p.height * 5.5) / 8 + x);
    }

    p.fill(13, 26, 108);
    p.beginShape();
    p.vertex(0, p.height);
    let zoff = 0;
    for (let x = 0; x < p.width; x++) {
      let y =
        p.noise(zoff) * 250 +
        (p.sin(10 * zoff) * p.height) / 100 +
        p.height * 0.5;
      p.vertex(x, y);

      zoff += 0.01;
    }
    p.vertex(p.width, p.height);
    p.endShape();

    p.fill(0);
    p.beginShape();
    p.vertex(0, p.height);
    let koff = 0;
    for (let x = 0; x < p.width; x++) {
      let y =
        p.noise(koff) * 10 +
        (p.sin(koff + 100) * p.height) / 100000 +
        p.height * 0.735;
      p.vertex(x, y);

      koff += 0.01;
    }
    p.vertex(p.width, p.height);
    p.endShape();

    //gradient ground
    for (x = (p.height * 3) / 4; x < p.height; x = x + 0.5) {
      colo = p.map(x, (p.height * 3) / 4, p.height, 0, 1);
      colon = p.lerpColor(c5, c4, colo);
      p.stroke(colon);
      p.line(0, x, p.width, x);
    }
    p.pop();

    //manual mountain
    p.fill(15, 6, 59);
    p.beginShape();
    p.vertex(p.width * 0.29, p.height * 0.85);
    p.vertex(p.width * 0.21, p.height * 0.67);
    p.vertex(p.width * 0.11, p.height * 0.59);
    p.vertex(p.width * 0.08, p.height * 0.27);
    p.vertex(p.width * 0.03, p.height * 0.15);
    p.vertex(p.width * 0, p.height * 0.13);
    p.vertex(p.width * 0, p.height);
    p.vertex(p.width * 0.37, p.height);
    p.endShape();

    //manual mountain
    p.beginShape();
    p.vertex(p.width * 0.69, p.height * 0.85);
    p.vertex(p.width * 0.77, 0.55 * p.height);
    p.vertex(p.width * 0.83, 0.47 * p.height);
    p.vertex(p.width * 0.88, 0.48 * p.height);
    p.vertex(p.width * 0.9, 0.65 * p.height);
    p.vertex(p.width * 0.91, 0.67 * p.height);
    p.vertex(p.width * 0.92, 0.7 * p.height);
    p.vertex(p.width * 0.95, 0.89 * p.height);
    p.vertex(p.width * 0.78, 0.89 * p.height);
    p.endShape();

    //holes
    p.push();
    p.fill(244, 115, 178, p.random(220, 250));
    p.triangle(
      p.width * 0.83,
      0.69 * p.height,
      p.width * 0.86,
      0.68 * p.height,
      p.width * 0.84,
      0.71 * p.height
    );
    p.triangle(
      p.width * 0,
      0.17 * p.height,
      p.width * 0,
      0.14 * p.height,
      p.width * 0.02,
      0.15 * p.height
    );
    p.triangle(
      p.width * 0.77,
      0.55 * p.height,
      p.width * 0.82,
      0.49 * p.height,
      p.width * 0.81,
      0.54 * p.height
    );
    p.triangle(
      p.width * 0.11,
      0.62 * p.height,
      p.width * 0.19,
      0.68 * p.height,
      p.width * 0.12,
      0.69 * p.height
    );

    if (
      p.mouseX > p.width * 0.1 &&
      p.mouseX < p.width * 0.18 &&
      p.mouseY > p.height * 0.62 &&
      p.mouseY < p.height * 0.69
    ) {
      balls.push(new Ball(p.width * 0.13, 0.66 * p.height));
    }
    if (
      p.mouseX > p.width * 0.77 &&
      p.mouseX < p.width * 0.81 &&
      p.mouseY > p.height * 0.49 &&
      p.mouseY < p.height * 0.54
    ) {
      balls.push(new Ball(p.width * 0.8, 0.53 * p.height));
    }
    if (
      p.mouseX > p.width * 0.82 &&
      p.mouseX < p.width * 0.85 &&
      p.mouseY > p.height * 0.68 &&
      p.mouseY < p.height * 0.71
    ) {
      balls.push(new Ball(p.width * 0.84, 0.7 * p.height));
    }

    for (let i = 0; i < balls.length; i++) {
      balls[i].move();
      balls[i].display();
      balls[i].checkCanvas();
    }

    for (let i = balls.length - 1; i >= 0; i--) {
      if (balls[i].isDone == p.true) {
        balls.splice(i, 1);
      }
    }

    //white holes
    p.fill(244, 226, 229);

    p.triangle(
      p.width * 0.113,
      0.64 * p.height,
      p.width * 0.16,
      0.684 * p.height,
      p.width * 0.12,
      0.69 * p.height
    );

    p.triangle(
      p.width * 0.79,
      0.545 * p.height,
      p.width * 0.815,
      0.51 * p.height,
      p.width * 0.81,
      0.54 * p.height
    );

    p.triangle(
      p.width * 0.835,
      0.7 * p.height,
      p.width * 0.853,
      0.69 * p.height,
      p.width * 0.84,
      0.71 * p.height
    );
    p.pop();
  };
};
var myp5 = new p5(sketch,'c1');

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

let sketch2 = function(p){
  let stars = [];
  let lightspeed = true;
  e = 0;
  boom = false;

  class particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xspd = 0;
    this.yspd = 0;
    this.xacc = 0.01;
    this.yacc = 0.01;
    this.history = [];
    this.strok = p.random(5);
  }
  update() {
    this.xspd = this.x + 0.09 * (this.x - p.width / 2);
    this.yspd = this.y + 0.09 * (this.y - p.height / 2);

    if (lightspeed == true) {
      this.x = this.xspd;
      this.y = this.yspd;
    }

    if (lightspeed == false) {
      if (this.xacc <= 0.01 && this.yacc <= 0.01) {
        this.xacc = this.xacc - 0.0005;
        this.yacc = this.yacc - 0.0005;
        if (this.xacc <= 0.0 && this.yacc <= 0.0) {
          this.xacc = -0.0;
          this.yacc = -0.0;
        }
      }

      this.x = this.x + this.xacc * (this.x - p.width / 2);
      this.y = this.y + this.yacc * (this.y - p.width / 2);
    }

    let v = p.createVector(this.x, this.y);
    this.history.push(v);
    if (this.history.length > 20 && lightspeed == true) {
      this.history.splice(0, 1);
    }
    if (this.history.length > 20 && lightspeed == false) {
      this.history.splice(0, 1);
    }
  }
  display() {
    //stroke (50,50,255)
    p.noFill();
    p.strokeWeight(this.strok);
    p.beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      p.vertex(pos.x, pos.y);
    }
    p.endShape();
    //ellipse(this.x,this.y,10,10)
  }
}
  
p.setup = function() {
  p.colorMode(p.HSL);
  p.rectMode(p.CENTER);
  let canvas = p.createCanvas(p.windowWidth*0.5, p.windowHeight*0.8);
  canvas.parent("canvasContainer2");
  for (let i = 0; i < 70; i++) {
    stars.push(new particle(p.random(p.width), p.random(p.height)));
  }
}

p.draw = function() {
  p.translate(p.width/2,p.height/2)
  p.translate((-p.mouseX)-p.width/8,-p.mouseY-p.height/8)
  p.background(0);
  for (let i = 0; i < stars.length; i++) {
    p.stroke(p.random(200, 300), 100, p.random(20, 60));
    stars[i].display();
    stars[i].update();
  }
  if (lightspeed == true) {
    for (let i = 0; i < 10; i++) {
      stars.push(new particle(p.random(p.width), p.random(p.height)));
    }
  }
  if (lightspeed == false) {
    if (stars.length > 200) {
      stars.splice(0, 50);
    }
  }
  if (stars.length > 500) {
    stars.splice(1, 10);
  }
  p.deathStar();
  p.spaceShip();
}

p.deathStar = function() {
  p.push();
  p.translate(p.width / 2, p.height / 2);
  if (e == 0) {
    p.scale(0);
  }
  if (lightspeed == false) {
    e = e + 0.1;
    p.scale(e);
    if (e >= 1) {
      e = 0.9;
    }
  }

  if (lightspeed == true) {
    if (e >= 0.9) {
      e = e + 0.2;
      p.scale(e);
    }
    if (e >= 2.5) {
      e = 0;
    }
  }

  {
    p.colorMode(p.RGB)
    p.fill(20,40,151);
    p.noStroke();
    p.ellipse(158, 167 - 200, 100);
    p.noFill();
    
    for (x = 0; x < 30; x = x + 1) {
      //stroke(70 - x);
      p.stroke(75,5,154,x)
      p.ellipse(158, -33, 99 + x);
    }

    p.strokeWeight(1);
    for (x = 0; x < 110; x = x + 1) {
      lala= p.map(x,0,90,120,0)
      p.stroke(94,155,234,lala);
      p.ellipse(158, -33, 100 - x,100);
    }
    p.noStroke()
    p.fill(20,40,151)
      p.arc(158,-33,100,100,(p.PI+p.HALF_PI),p.HALF_PI)
    
    for (x = 60; x > 0; x--) {
      p.stroke(64, 241, 241, x);
      p.noFill()
      p.strokeWeight(3)
      p.ellipse(-0.7*p.width,-0.5*p.height,p.height*0.45-x)
    }
    p.fill(15,6,59)
    p.ellipse(-0.7*p.width,-0.5*p.height,p.height*0.35)
  }
  p.pop();
}

p.spaceShip = function() {
  yaya = p.random(15);
  p.push();
  p.colorMode(p.RGB);
  p.stroke(yaya);

  p.strokeWeight(15);
  if (lightspeed == true) {
    p.stroke(100, 20, p.random(100, 200));
  }
  p.rect(p.width / 2, p.height / 2, p.width * 0.69, 0.68 * p.height);
  
  if (lightspeed == true) {
    p.stroke(yaya);
  }
  else(p.noStroke())
  p.rect(p.width / 2, p.height / 2, p.width * 0.7, 0.7 * p.height);
  p.line(p.width * 0.15, p.height * 0.15, -p.width, -p.height);
  p.line(p.width * 0.15, p.height * 0.85, -p.width, 2 * p.height);
  p.line(p.width * 0.85, p.height * 0.85, 2 * p.width, 2 * p.height);
  p.line(p.width * 0.85, p.height * 0.15, 2 * p.width, -p.height);
  
  if (lightspeed == true) {
    p.fill(100, 20, 100, p.random(200, 250));
  } else p.fill(70,40,100, 100);
  p.noStroke()
  p.beginShape();
  p.vertex(-p.width, -p.height);
  p.vertex(p.width * 0.15, p.height * 0.15);
  p.vertex(p.width * 0.85, p.height * 0.15);
  p.vertex(2 * p.width, -p.height);
  p.endShape();

  p.beginShape();
  p.vertex(p.width * 0.15, p.height * 0.85);
  p.vertex(-p.width, 2 * p.height);
  p.vertex(2 * p.width, 2 * p.height);
  p.vertex(p.width * 0.85, p.height * 0.85);
  p.endShape();

  p.beginShape();
  p.vertex(p.width * 0.15, p.height * 0.85);
  p.vertex(p.width * 0.15, p.height * 0.7);
  p.vertex(p.width * -0.07, 0.85 * p.height);
  p.vertex(p.width * -0.1, 0.7 * p.height);
  p.vertex(-p.width, 1 * p.height);
  p.vertex(-p.width, 2 * p.height);
  p.vertex(p.width * 0.15, p.height * 0.85);
  p.endShape();

  p.beginShape();
  p.vertex(p.width * 0.85, p.height * 0.85);
  p.vertex(p.width * 0.85, p.height * 0.7);
  p.vertex(p.width * 1.03, 0.85 * p.height);
  p.vertex(p.width * 1.9, 0.7 * p.height);
  p.vertex(2 * p.width, 1 * p.height);
  p.vertex(2 * p.width, 2 * p.height);
  p.vertex(p.width * 0.85, p.height * 0.85);
  p.endShape();

  p.push()
  p.strokeWeight(6)
  for(x=0;x<100;x=x+0.3){
    koko = p.map(x,0,100,0.15,-1.8)
    kaka = p.map(x,0,100,0.85,2.8)
    coco = p.map(x,0,20,0,250)
    za = p.map(x,0,100,0,p.height*2)
    p.stroke(0,0,0,coco)
    p.line(p.width*koko, p.height * 0.85+za,p.width*kaka,p.height*0.85+za)
    p.line(p.width*koko, p.height * 0.15-za,p.width*kaka,p.height*0.15-za)
  }
  
  p.pop()
  
  p.pop();
}

p.mousePressed = function() {
  if(p.mouseX<p.width && p.mouseX>0 && p.mouseY<p.height && p.mouseY>0){
    lightspeed = !lightspeed;
  }
}
}

var myp5 = new p5(sketch2, 'c2');

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

let sketch3 = function (p) {
  let timer = 0;
  p.setup = function() {
    let canvas = p.createCanvas(p.windowHeight * 0.6, p.windowHeight * 0.6);
    canvas.parent("canvasContainer3");
    p.angleMode(p.DEGREES);
    p.colorMode(p.RGB);
  }

  p.draw = function() {
    p.push()
    p.background(250);
      fastY = p.map(p.mouseY, 0, p.windowHeight, -p.height / 15, p.height / 15);
      slowY = p.map(p.mouseY, 0, p.windowHeight, -p.height / 20, p.height / 20);
      slowerY = p.map(p.mouseY, 0, p.windowHeight, -p.height / 30, p.height / 30);

      fastX = p.map(p.mouseX, 0, p.windowWidth, -p.width / 15, p.width / 15);
      slowX = p.map(p.mouseX, 0, p.windowWidth, -p.width / 20, p.width / 20);
      slowerX = p.map(p.mouseX, 0, p.windowWidth, -p.width / 30, p.width / 30);
    p.translate(p.width / 2, p.height / 2);
    p.push();
    //fill('rgba(255,0,0)')
    p.stroke(255);
    time = timer;
    noiseVal = p.map(p.noise(time), 0, 10, 0, 300);
    func = (p.width / 4) * p.sin(time) + noiseVal;
    func1 = (p.width / 4) * p.cos(time) + noiseVal;

    mover = (p.pmouseX - p.mouseX) * 0.5;
    timer = timer + 1 + mover;

    p.fill(150);
    p.rect(-p.width, -p.height, 2 * p.width, 2 * p.height);
    
    p.pop();
    p.scale(1)
    if(p.mouseIsPressed){
      p.translate(p.random(10),p.random(10))
    }
    p.noStroke();
    p.fill(100);
    p.ellipse(0, 0, p.width / 2);
    p.fill(200);
    p.ellipse(0, 0, (p.width * 0.9) / 2);
    p.fill(0);
    p.ellipse(0, 0, (p.width * 0.85) / 2);
    for (x = 0; x < 100; x++) {
      yaya = p.map(x, 0, 100, 0, 250);
      p.fill(yaya / 4, 0, yaya);
      p.ellipse(slowerX, slowerY, (p.width * 0.7) / 2 - x);
    }
    p.fill(50, 0, 200);
    p.ellipse(slowX, slowY, (p.width * 1) / 10);

    p.fill(255, 255, 0);
    p.ellipse(fastX, fastY, (p.width * 1) / 60);
    
      p.pop()
  }
};

var myp5 = new p5(sketch3, 'c3');
