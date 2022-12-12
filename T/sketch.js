let sketch4 = function(p){
  let seq = 0;
  let img;
  let inp;
  
  p.preload = function() {
    img = p.loadImage("2holo.png");
    myFont = p.loadFont("PressStart2P-Regular.ttf");
  }
  
  p.setup=function() {
    let canvas = p.createCanvas(p.windowWidth * 0.7, (p.windowWidth * 0.7) / 4);
    p.rectMode(p.CENTER);
    inp = p.createInput();
    inp.position(p.width * 0.25, p.height * 0.25);
    inp.size(p.width / 2, p.height / 2);
    inp.style("background-color", "rgba(255, 0, 0, 100)");
    inp.style("color", "rgba(255, 0, 0, 0)");
    inp.style("border", "none");
    inp.style("outline", "none");
  }
  
  p.draw=function() {
    //background('rgba(0,0,0,0)');
    p.clear();
    p.image(img, 0, 0);
    img.resize(p.windowWidth * 0.7, 0);
    p.translate(p.width / 2, p.height / 2);
    p.textAlign(p.CENTER);
    p.fill(250);
    p.textFont(myFont);
    p.textSize(10);
  
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
    p.text("click inside the box and start typing", 0, p.height*0.75-50);
    p.pop()
  }
  p.drawScene3=function() {
    p.text("Welcome Aboard " + inp.value()+"! It is all up to you now. You have to make decisions for this mission to succeed.", 0, 0,p.width*0.7);
  }
  p.drawScene4=function() {
    p.text("These are new worlds we are exploring. Make sure you consider the human race when making a decision", 0, 0,p.width*0.7);
  }
  
  p.drawEnding = function() {
    p.text("We appreciate your sacrifice, may God bless our planet", 0, 0,p.width*0.7);
  }
  }
  var myp5 = new p5(sketch4, 'c4');