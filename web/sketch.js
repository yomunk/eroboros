var blobs = []
var song;

let bpm= 0;
let spl = 0;
function setup() {
   async function getData() {
      const fetchInterval = setInterval(async () => {
        const response = await fetch("http://localhost:3000/", {
          Accept: "application/json",
          mode: "cors",
          // Add other headers if needed
        }).then((response) => {
          return response.json();
        });
        if(response.currentMessage){
        // console.log(response.currentMessage,Object.values(response.currentMessage)[3],Object.values(response.currentMesssage)[8])
        if(Object.values(response.currentMessage)[3]==="b"){
          console.log(Object.values(response.currentMesssage)[8])
          bpm = Object.values(response.currentMesssage)[8]
        }
          if(Object.values(response.currentMesssage)[3]==="s"){
          spl = Object.values(response.currentMesssage)[8];}
      
        console.log(response);
        }
      }, 200);
    }
    getData();
    song = loadSound('https://cdn.glitch.global/d5c3b111-c8ba-4e87-96bb-7779c6f7023b/Water%20Flow%20Sound%202%20Minutes.mp3?v=1708809929758', function(){
        song.play(); // Play the song when it's loaded
      });

   

      reverb = new p5.Reverb();

      // Disconnect the song so we'll only hear reverb
      song.disconnect();
    
      // Connect the song to the reverb, process with 6 second reverbTime, decayRate of 40%
      reverb.process(song, 6, 40);

      slider = createSlider(0, 20);
      slider.position(10, 10);
      slider.size(80);

      slider1 = createSlider(0, 50);
      slider1.position(10, 40);
      slider1.size(80);

      slider2 = createSlider(0, 100);
      slider2.position(10, 70);
      slider2.size(80);
    

  createCanvas(96, 96);
  
  colorMode(HSB);
  
  for (i = 0; i < 10; i++) blobs.push(new Blob(random(0, width), random(0, height)));


}

function draw() {
    let g = slider.value();
    let b = slider1.value();
    let c = slider2.value();
    console.log(bpm,spl);
  background(51);
  if (mouseIsPressed == true) {
    song.play();// White
  }
  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let sum = 0;
      for (i = 0; i < blobs.length; i++) {
        let xdif = x - blobs[i].x;
        let ydif = y - blobs[i].y;
        let d = sqrt((xdif * xdif) + (ydif * ydif));
        sum += 10 * blobs[i].r / d;
      }
      if (x == windowWidth / 2 && y == windowHeight / 2) {
        console.log(sum);
            }
      set(x, y, color(347, sum/5, sum/5));
    }
  }
  updatePixels();

  for (i = 0; i < blobs.length; i++) {
    blobs[i].update();
  }
 

  let dryWet = constrain(map(g, 0, width, 0, 1), 0, 1);
  // 1 = all reverb, 0 = no reverb
  reverb.drywet(dryWet);
  
  // console.log(dryWet);

   // text(controlVol, 10, 20);
}
