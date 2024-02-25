let x, y;
let amp;
let speed;
let dx, dy;
let n;
let density;
let dr;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  x = 0;
  y = -height/4;
  dx = 1;
  dy = 1;
  amp = 0;
  speed = 2;
  n = 0;
  density = 7;
  dr = 6;
}

function draw() {
  
  background(9, 7, 64, 20);
  
  for (let d = 0; d <= density; d++) {
    
    noFill();
    stroke(55, 48, 242);
    strokeWeight(5);
    beginShape();
    for (let i = 0; i <= width; i++) {
      let px = i;
      let py = amp*(px - x)^2 + y + height/2 + d*height/dr;
    
      vertex(px, py);
    }
    endShape();
    
    noFill();
    stroke(101, 98, 191);
    beginShape();
    for (let i = 0; i <= width; i++) {
      let px = i;
      let py = amp*(px - x)^2 + y + height/2 - d*height/dr;
    
      vertex(px, py);
    }
    endShape();
  }
  
  x -= dx*speed;
  
  if (n % 500 < 250) {
    y += dy;
  }
  
  else {
    y -= dy;
  }
  
  if (x < -width) {
    x = 0;
  }
  
  amp = 0.1*mouseX/width;
  
  n++;
  
}