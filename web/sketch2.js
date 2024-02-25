let x, y;
let amp;
let speed;
let dx, dy;
let n;
let density;
let dr;
let colorTop, colorBot;

function preload() {
  soundFile = loadSound('/web/woodpeckers.wav');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playSound);

  background(9, 7, 64);
  
  x = 0;
  y = -height/4;
  
  // change in x and y per frame at speed = 1
  dx = 1;
  dy = 1;
  
  dr = 6;
  
  // arbitrary vars (inputs from sensors)
  amp = 0;
  speed = 1;
  density = 7;
  
  // color range
  colorTop = color(8, 78, 199);
  colorBot = color(8, 199, 21);
  
  // counts how many times the lines move
  n = 0;
    
  // arbitrary amp
  amp = 0.1*mouseX/width;
    
  slider = createSlider(0, 100);
  slider.position(10, 10);
  slider.size(80);
  
  reverb = new p5.Reverb();
  soundFile.disconnect(); // so we'll only hear reverb...

  // connect soundFile to reverb, process w/
  // 3 second reverbTime, decayRate of 2%
  reverb.process(soundFile, 20, 50);
  
}

function wave(x, y, dx, dy, dr, density, amp, speed, n, color1, color2) {
  let cx = x;
  let cy = y;
  
  for (let d = density*height/dr; d >= -density*height/dr; d -= height/dr) {
        
    let d_norm = map(d, -density*height/dr, density*height/dr, 0, 1);
    
    noFill();
    stroke(lerpColor(color1, color2, d_norm));
    strokeWeight(5);
    beginShape();
    for (let i = 0; i <= width; i++) {
      let px = i;
      let py = amp*(px - cx)^2 + cy + height/2 + d;
    
      vertex(px, py);
    }
    endShape();
  }
  
}

function draw() {
  
  background(9, 7, 64, 20);

  // arbitrary amp
  amp = 0.1*mouseX/width;
  
  wave(x, y, dx, dy, dr, density, amp, speed, n, colorTop, colorBot);
    
  // change in x
  x -= dx*speed;
  
  // change in y
  if (n % 500 < 250) {
    y += dy;
  }
  else {
    y -= dy;
  }
  
  // for when x decreases too much
  if (x < -width) {
    x = 0;
  }
  
  n++;
  speed = 4*mouseY/height;
  
  let g = slider.value();
  let dryWet = constrain(map(g, 0, width, 0, 1), 0, 1);
  
  // 1 = all reverb, 0 = no reverb
  reverb.drywet(dryWet);
  
  console.log(dryWet);

  strokeWeight(1);
  stroke(255);

  
}

function playSound() {
  soundFile.play();
}