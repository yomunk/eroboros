// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

class Blob {

    constructor(x, y) {
      this.x = x;
      this.y = y;
      let angle = random(0, 2 * PI);
      this.xspeed = (random(2, 5) * Math.cos(angle)) / 10;
      this.yspeed = (random(2, 5) * Math.sin(angle)) / 10;
      this.r = random(48, 200);
    }
  
    update() {
      this.x += this.xspeed;
      this.y += this.yspeed;
      if (this.x > width || this.x < 0) this.xspeed *= -1;
      if (this.y > height || this.y < 0) this.yspeed *= -1;

      // you could modulate the speed by creating a normalized vector of its current amount and applying a multiplier
    }
  
    show() {
      noFill();
      stroke(0);
      strokeWeight(4);
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
  }