let x =[]
let y =[]
let dia =[]

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220,200,200,100);
  for(let i = 0;i<x.length;i++){
    
    x[i]+=random(-1,1)
    y[i]+=random(-1,1)
    circle(x[i],y[i],dia[i])
  }
}
function mousePressed(){
  x.push(mouseX);
  y.push(mouseY);
  dia.push(random(10,100))
}