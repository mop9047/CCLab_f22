let dancer;
let g = 2;

function setup() {
  let canvas = createCanvas(1300, 600);
  canvas.parent("canvasContainer");
  dancer = new MathewHotdog(width/2+200,height/2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(255,190,46);
  //drawFloor(); // for reference only
  
  dancer.update();
  dancer.display();
}

class MathewHotdog {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.maya = 20 * sin(frameCount * 0.03);
    this.hot = true;
    this.time = 0;
    this.time1 = 0;
    this.time2 = 0;
  }
  
  
  
  update() {
    this.maya = 20 * sin(frameCount * 0.1);
    this.paya = 20 * sin(frameCount * 0.12);
    
    
    if(this.time2 >1000 && this.hot == true){
      this.hot = false
      this.time2 = 0
    }
    else if(this.time2 >1000 && this.hot == false){
      this.hot = false
      this.time2 = 0
    }
    
    if (this.hot == true) {
      this.time = this.time + 0.1;
      if (this.hot == true && this.time > 2) {
        if (mouseIsPressed) {
          this.time = 0;
          this.hot = false;
        }
      }
    } else if (this.hot == false) {
      this.time = this.time + 0.1;
      if (this.hot == false && this.time > 3) {
        if (mouseIsPressed) {
          this.time = 0;
          this.hot = true;
        }
      }
    } else if (this.hot == false) {
      if (mouseIsPressed) {
        this.hot = true;
      }
    }
  }
  display() {
    push();
    this.time2 = this.time2 + 1;
    this.time1 = this.time1 + 1;
    translate(this.x, this.y);
    scale(g);
    if (this.time1 >= 150) {
      scale(-1, 1);
      if (this.time1 >= 300) {
        this.time1 = 0;
      }
    }
    // ⬇️ draw your dancer here ⬇️
    if (this.hot == true) {
      translate(0, this.maya);
      this.limbs(
        -22,
        0,
        -90,
        -40 + this.maya,
        -110,
        30 + 0.5 * this.maya - 20,
        13,
        13
      );
      this.limbs(-10, 114, 0, 171 + 0.5 * -this.maya, -20, 155, 13, 5);
      this.buns(-20, -80, -20, 80, 0, 0);
      this.hotdog(0, -100, 0, 100, 20, 0);
      this.buns(40, -80, 40, 80, 60, 0);
      this.face();
      this.limbs(62, 0, 131, -40, 110, 30 + 0.5 * -this.maya - 20, 13, 13);
      this.limbs(15, 114, 60, 171 + 0.5 * -this.maya, 9, 155, 13, 5);
    }
    if (this.hot == false) {
      ///situation 2
      translate(0, 0);
      this.limbs(
        -22,
        0,
        -100 + -this.paya,
        70,
        -70 + 0.5 * this.paya,
        50,
        13,
        13
      );
      this.limbs(-10 + this.paya, 114, 0, 171, -20, 155, 13, 5);

      this.buns(-10, -80, -20 + this.paya, 80, 0, 0);
      this.hotdog(10, -100, 0 + this.paya, 100, 20, 0);
      this.buns(50, -80, 40 + this.paya, 80, 60, 0);

      this.limbs(62, 0, 0 + -this.paya, 72, 60 + 0.5 * this.paya, 60, 13, 13);
      this.limbs(15 + this.paya, 114, 60, 171, 9, 155, 13, 5);
      this.face2();
    }

    pop();
  }

  hotdog(x1, y1, x2, y2, mpx, mpy) {
    push();
    noFill()
    stroke(80, 0, 47);
    strokeWeight(70);
    bezier(x1, y1, mpx, mpy, mpx, mpy, x2, y2);
    stroke("#CC2522");
    strokeWeight(60);
    bezier(x1, y1, mpx, mpy, mpx, mpy, x2, y2);
    stroke('rgba(255,255,255,0.3)');
    strokeWeight(5);
    bezier(x1-25, y1, mpx-25, mpy, mpx-25, mpy, x2-25, y2);
    pop();
  }

  buns(x1, y1, x2, y2, mpx, mpy) {
    push();
    noFill()
    stroke(80, 0, 47);
    strokeWeight(70);
    bezier(x1, y1, mpx, mpy, mpx, mpy, x2, y2);

    stroke(251, 187, 22);
    strokeWeight(60);
    bezier(x1, y1, mpx, mpy, mpx, mpy, x2, y2);
    
    stroke('rgba(255,255,200,0.6)');
    strokeWeight(5);
    bezier(x1-25, y1, mpx-25, mpy, mpx-25, mpy, x2-25, y2);
    
    stroke('rgba(245,162,28,1)');
    strokeWeight(5);
    bezier(x1+25, y1, mpx+25, mpy, mpx+25, mpy, x2+25, y2);
    pop();
  }

  limbs(x1, y1, x2, y2, mpx, mpy, w, h) {
    push();
    noFill();
    stroke(80, 0, 47);
    strokeWeight(12);
    bezier(x1, y1, mpx, mpy, mpx, mpy, x2, y2);
    
    stroke('rgba(245,200,28,0.6)');
    strokeWeight(3);
    bezier(x1, y1-3, mpx, mpy-3, mpx, mpy-3, x2, y2-3);
    
    stroke(80, 0, 47);
    strokeWeight(12);
    ellipse(x2, y2, w, h);
    pop();
  }

  face() {
    push();
    fill(255);
    stroke(80, 0, 47);
    strokeWeight(4);
    ellipse(-20, -50, 30);
    ellipse(-23, -50, 5);
    ellipse(10, -50, 30);
    ellipse(15, -50, 5);
    stroke(255)
    ellipse(12, -55, 3);
    ellipse(-26, -55, 3);
    pop();

    noFill();
    stroke(80, 0, 47);
    strokeWeight(3);
    arc(0, -30, 20, 20, 0, HALF_PI);
  }

  face2() {
    translate(10, 0);
    push();
    noFill();
    stroke(80, 0, 47);
    strokeWeight(4);
    line(-2, -63, 18, -61);
    line(-15, -63, -30, -60);

    arc(10, -75, 30, 10, 1, PI);
    arc(-35, -75, 30, 10, -0.1, 1 + QUARTER_PI);
    pop();

    push();
    fill(255);
    stroke(80, 0, 47);
    strokeWeight(2);
    rotate(90);
    arc(-40, 20, 10, 30, -5, 1.25 * PI, CHORD);
    pop();
  }
  state() {
    this.hot = !this.hot;
  }
}

function mouseWheel(event) {
  if (event.deltaY > 0) {
    g = g + 0.010;
  } else {
    g = g - 0.010;
  }
}