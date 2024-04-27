"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();

  if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
    
    if(XXH.h32("tile:" + [i, j], worldSeed)%100 == 4){
    fill(0,255, 0);
    //triangle(tw ,tw/2,tw/2,-th-20,-th-20,tw);
    push();
    translate(0,-20)
    triangle(tw/2,(tw)/6,tw/6,-th-10,-th-10,(tw)/4);
    pop();
    fill(150,75,0);
    rect(tw/2-20,-th-5,th/2,th);
    }
    fill(34, 139,39);
  } 
  else if(XXH.h32("tile:" + [i, j], worldSeed) % 3 == 0){
    fill(150,75,0);
  }
  else {
    if(XXH.h32("tile:" + [i, j], worldSeed)%10 == 2){
      fill(255, 255, 100, 128);
      triangle(0,-tw/4,-tw/2,-tw/2,-tw/2,0);
      triangle(5,-tw/4-2,-tw/2-2,-tw/2-2,-tw/2-2,5);
    }
    fill(0,128,0);
  }

  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);


  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    if(XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0){
      fill(255,203,164);
      ellipse(5,-15,10,10);
      translate(0, -10);
      rect(0,0,10,20);
    }
    else if(XXH.h32("tile:" + [i, j], worldSeed) % 3 == 0){
      fill(0,0,255);
      beginShape();
      vertex(-tw, 0);
      vertex(0, th);
      vertex(tw, 0);
      vertex(0, -th);
      endShape(CLOSE);
    }
    else{
      fill(0, 0, 0, 32);
      rect(0, 0, 20, 10);
      translate(0, -10);
      fill(255, 255, 100, 128);
      rect(0, -10, 20, 20);
    }
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 10, 10);
}

function p3_drawAfter() {}
