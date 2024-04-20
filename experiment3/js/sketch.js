/* exported generateGrid, drawGrid */
/* global placeTile */

const lookup = [[1, 0],[1, 0], [0, 0],[0, 0],[2, 0],[2, 0],[1, 0],[1, 0],[1, 0],[1, 0],[0, 0],[0, 0],[2, 0],[2, 0],[1, 0],[1, 0]];
const styles = [['0','1','13'],['18','19','14'],['6','7','9']];
let rowsC = 0;
function generateGrid(numCols, numRows) {
  rowsC = numRows
  let grid = [];
  let numGrids = floor(random(2,4));
  for (let i = 0; i < numRows*numGrids; i++) {
    let row = [];
    for (let j = 0; j < numCols*numGrids; j++) {
      let corner1 = noise(i / 30, j / 30);
      let corner2 = noise(i / 20, j / 20);
      if(j == 0 ||  i == 0 ){
        row.push("_");
      }
      else if((corner1 - 0.6) < 0.03 && (corner2 >0.5)){
        row.push("w");
      }
      else{
        row.push(".")
      }
    }
    grid.push(row);
  }
  
  return grid;
}

function drawGrid(grid) {
  background(255,255,255);
  let currStyle = floor(random(0,3));
  for(let i = 0; i < grid.length; i++) {
    if(i%rowsC==0){
      currStyle = floor(random(0,3))
    }
    for(let j = 0; j < grid[i].length; j++) {

      if (gridCheck(grid,i,j,'_')) {
        placeTile(i, j, (floor(random(4))), styles[currStyle][1]);
      }
      else{
        drawContext(grid, i, j, "_", 4, styles[currStyle][1]);
      }
      if (gridCheck(grid,i,j,'.')) {
        placeTile(i, j, (floor(random(4))), styles[currStyle][0]);
      }
      else{
        drawContext(grid, i, j, ".", 4, styles[currStyle][0]);
      }
      if(gridCheck(grid,i,j,'w')){
        placeTile(i, j, (4 * pow(noise(millis()/1000 / 10, i, j  + millis()/1000), 2)) , styles[currStyle][2]);
      }
      else{
        drawContext(grid, i, j, "w", 4, styles[currStyle][2]);
      }
    }
  }
}

function gridCheck(grid, i, j, target) {
  if(i < grid.length && i >= 0 && j>=0 && j < grid[i].length){
    if(grid[i][j] == target){
      return true;
    }
  }
  return false;
}

function gridCode(grid, i, j, target) {
  //let northBit,southBit,eastBit,westBit;
  let code = 0;
  if(gridCheck(grid,i,j+1,target)){
    code += 1;
  }
  if(gridCheck(grid,i,j-1,target)){
    code += 1<<1;
  }
  if(gridCheck(grid,i-1,j,target)){
    code += 1<<2;
  }
  if(gridCheck(grid,i+1,j,target)){
    code += 1<<3;   
  }
  return code;
}

function drawContext(grid,i,j,target,ti,tj){
  const [tiOffset, tjOffset] = lookup[gridCode(grid,i,j,target)];
  placeTile(i, j, ti + tiOffset, tj + tjOffset);
  
}