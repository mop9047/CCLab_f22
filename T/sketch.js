
let sketch4 = function(p){
  let seq = 0;
  let img;
  let inp;
  
  p.preload = function() {
    img = p.loadImage("2holo.png");
    myFont = p.loadFont("PressStart2P-Regular.ttf");
  }
  
  p.setup=function() {
    let canvas1 = p.createCanvas(p.windowWidth * 0.7, (p.windowHeight*0.20));
    canvas1.parent("sketchHolder");
    p.rectMode(p.CENTER);
    inp = p.createInput();
    inp.size(p.width *0.5, p.height *0.6);
    inp.parent("sketchHolder")
    inp.position(p.width*0.2, p.height*0.2);
    inp.style("background-color", "rgba(255, 0, 0, 0)");
    inp.style("color", "rgba(255, 0, 0, 0)");
    inp.style("border", "none");
    inp.style("outline", "none");
  }
  
  p.draw=function() {
    p.background('rgba(200,200,200,100)');
    //p.clear();
    p.image(img, 0, 0);
    img.resize(p.windowWidth*0.7, p.height);
    p.translate(p.width / 2, p.height / 2);
    p.textAlign(p.CENTER);
    p.fill(250);
    p.textFont(myFont);
    p.textSize(p.width/90);
  
    p.push();
    p.noStroke();
    p.triangle(
      p.width * 0.35,
      -0.15 * p.height,
      p.width * 0.35,
      0.15 * p.height,
      p.width * 0.4,
      0.0 * p.height
    );
  
    p.triangle(
      -p.width * 0.35,
      -0.15 * p.height,
      -p.width * 0.35,
      0.15 * p.height,
      -p.width * 0.4,
      0.0 * p.height
    );
    p.pop();
  
    //console.log(int(mouseX*100/width),int(mouseY*100/height))
  
    switch (seq) {
      case 0:
        p.drawIntro();
        break;
      case 1:
        p.drawScene1();
        break;
      case 2:
        p.drawScene2();
        break;
      case 3:
        p.drawScene3();
        break;
      case 4:
        p.drawScene4();
        break;
      default:
        p.drawEnding();
        break;
    }
  }
  
  p.mousePressed=function () {
    p.proceedSequence();
  }
  
  p.proceedSequence=function() {
    if (
      p.mouseX > p.width * 0.85 &&
      p.mouseX < p.width * 0.9 &&
      p.mouseY > p.height * 0.35 &&
      p.mouseY < p.height * 0.65
    ) {
      seq = seq + 1;
    }
  
    if (
      p.mouseX > p.width * 0.1 &&
      p.mouseX < p.width * 0.15 &&
      p.mouseY > p.height * 0.35 &&
      p.mouseY < p.height * 0.65
    ) {
      seq = seq - 1;
    }
    if (seq == 6) {
      seq = 0;
    }
  }
  
  p.drawIntro=function() {
    p.textWrap(p.WORD);
    p.text("Welcome cadet! I am captain Smith", 0, 0, p.width * 0.7);
  }
  p.drawScene1=function() {
    p.text("What is your name?", 0, 0);
  }
  
  p.drawScene2=function() {
    p.push()
    p.noFill()
    p.stroke(255)
    p.strokeWeight(2)
    p.rect(0,0,p.width*0.5,p.height*0.5,10)
    p.pop()
    p.text(inp.value(), 0, 0);
    if (p.keyIsPressed === true) {
      if(p.keyCode == p.ENTER){
        seq = 3;
      }
    }
    p.push()
    p.textSize(p.width/90)
    p.text("click inside the box and start typing", 0, p.height*0.25);
    p.pop()
  }
  p.drawScene3=function() {
    p.text("Welcome Aboard " + inp.value()+"! It is all up to you now. You have to make decisions for this mission to succeed.", 0, 0,p.width*0.7);
  }
  p.drawScene4=function() {
    p.text("These are new worlds we are exploring. Make sure you consider the human race when making a decision, not just yourself,"+inp.value(), 0, 0,p.width*0.7);
  }
  
  p.drawEnding = function() {
    p.text("We appreciate your sacrifice, may God bless our planet", 0, 0,p.width*0.7);
  }
  }
  var myp5 = new p5(sketch4, 'c4');


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

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

