// project.js - purpose and description here
// Author: Your Name
// Date:

/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function p4_inspirations() {
  return [
    {name: "creeper", assetURL: './assets/creeper.png'},
    {name: "donkey", assetURL: "./assets/donkey.jpg"},
    {name: "sunset", assetURL: "./assets/sunset.jpg"},
    {name: "choncc", assetURL: "./assets/choncc.jpg"},
  ];
}

function p4_initialize(inspiration) {
  resizeCanvas(inspiration.image.width/2, inspiration.image.height/2 );
  return {alpha:255, size: 10 ,drawSize: 20};
}

function p4_render(design, inspiration) {
  inspiration.image.loadPixels();
  noStroke();
  background(255,255,255);
  for(let i = 0; i <inspiration.image.width;i+=design.size){
    for(let j = 0; j < inspiration.image.height;j+=design.size){
      let c = inspiration.image.get(i*2,j*2);
      c[3] = design.alpha;
      fill(c);
      if(inspiration.name == 'donkey' || inspiration.name == 'choncc'){
        rect(i,j,design.drawSize,design.drawSize);  
      }
      else{
        ellipse(i,j,design.drawSize);  
      }
    }
  }
}

function p4_mutate(design, inspiration, rate) {
  design.alpha =(255 *(rate)+150)-(255*log(.8+rate));
  design.size = floor( 5 * constrain(randomGaussian(rate, (rate * (1)) / 20), 0, 1))+10;
  design.drawSize=(5*rate)+15;
}
