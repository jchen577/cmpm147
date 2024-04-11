// sketch.js - purpose and description here
// Author: Jacky Chen
// Date: 4/10/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let seed = 0;

const skyColor = "#87CEEB";
const mountColor = "#858290";
const grassColor = "#138510";
const lakeColor = "#A9D6D9";
const lakeColor2 = "#00008B";
const dryGrassColor = "#e4dc8a";
const treeColor = "#33330b";

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(),WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  createButton("reimagine").mousePressed(() => seed++);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);

  background(100);
  noStroke();
  
  fill(skyColor);
  rect(-width/2,-height/5,width,-height/2)
  
  fill(mountColor);
  beginShape();
  vertex(-width, -height /5);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width/2 * i) / steps;
    let y;
    if(i >= 3){
      y =
        -height / 5 - (random() * random() * random() * height) /3 - height / 15;
    }
    else{
      y =
        -height / 5 - (random() * random() * random() * height) /4 - height / 25;
    }
    vertex(x, y);
  }
  vertex(width, -height / 5);
  endShape(CLOSE);
  
  fill(grassColor);
  beginShape();
  vertex(-width, -height /5);
  for (let i = 0; i < 3; i++) {
    let x = (width/4 * i) / steps;
    let y =
        -height / 5 - (random() * random() * random() * height) /5 - height / 40;
    vertex(x, y);
  }
  vertex(width, -height / 5);
  endShape(CLOSE);
  
  
  fill(dryGrassColor);
  rect(-width/2,-height/5,width,height - height/5)
  
  push();
  fill(lakeColor);
  beginShape();
  translate(0,30,0);
  rotateZ(-20);
  let x = random(70,100);
  let y =random(100,125);
  let z = random(50,100);
  ellipsoid(x,y,z);
  fill(lakeColor2);
  ellipsoid(x-10,y-10,z+10);
  endShape(CLOSE);
  pop();
  
  fill(treeColor);
  const scrub = mouseX/width;
  const trees = random(10,20);
  for (let i = 0; i < trees; i++) {
    let z = random();
    let x = -width/2* ((random() + (scrub/50 + millis() / 500000.0) / z) % 1);
    let s = width/2 / 50 / z;
    let y = -height/2 / 2 + height / 20 / z;
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  }
  
  for (let i = 0; i < trees; i++) {
    let z = random();
    let x = width/2* ((random() + (scrub/50 + millis() / 500000.0) / z) % 1);
    let s = width/2 / 50 / z;
    let y = -height/2 / 2 + height / 20 / z;
    triangle(x, y - s, x - s / 4, y, x + s / 4, y);
  } 
}
