/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * 60, 16 * 60).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
  console.log(atob(`
LyogZXhwb3J0ZWQgZ2VuZXJhdGVHcmlkLCBkcmF3R3JpZCAqLwovKiBnbG9iYWwg
cGxhY2VUaWxlICovCgpmdW5jdGlvbiBnZW5lcmF0ZUdyaWQobnVtQ29scywgbnVt
Um93cykgewogIGxldCBncmlkID0gW107CiAgZm9yIChsZXQgaSA9IDA7IGkgPCBu
dW1Sb3dzOyBpKyspIHsKICAgIGxldCByb3cgPSBbXTsKICAgIGZvciAobGV0IGog
PSAwOyBqIDwgbnVtQ29sczsgaisrKSB7CiAgICAgIGxldCBvdXRlclZhbHVlID0g
bm9pc2UoaSAvIDQwLCBqIC8gNDApOwogICAgICBpZiAoYWJzKG91dGVyVmFsdWUg
LSAwLjUpIDwgMC4wMykgewogICAgICAgIHJvdy5wdXNoKCJ3Iik7CiAgICAgIH0g
ZWxzZSB7CiAgICAgICAgbGV0IGlubmVyVmFsdWUgPSBub2lzZShpIC8gMjAsIGog
LyAyMCk7CiAgICAgICAgaWYgKGlubmVyVmFsdWUgPiAwLjUpIHsKICAgICAgICAg
IHJvdy5wdXNoKCI6Iik7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgIHJvdy5w
dXNoKCIuIik7CiAgICAgICAgfQogICAgICB9CiAgICB9CiAgICBncmlkLnB1c2go
cm93KTsKICB9CgogIHJldHVybiBncmlkOwp9CgpmdW5jdGlvbiBkcmF3R3JpZChn
cmlkKSB7CgogIGJhY2tncm91bmQoMTI4KTsKICBjb25zdCBnID0gMTA7CiAgY29u
c3QgdCA9IG1pbGxpcygpIC8gMTAwMC4wOwoKICBub1N0cm9rZSgpOwogIGZvciAo
bGV0IGkgPSAwOyBpIDwgZ3JpZC5sZW5ndGg7IGkrKykgewogICAgZm9yIChsZXQg
aiA9IDA7IGogPCBncmlkW2ldLmxlbmd0aDsgaisrKSB7CiAgICAgIHBsYWNlVGls
ZShpLCBqLCAoNCAqIHBvdyhub2lzZSh0IC8gMTAsIGksIGogLyA0ICsgdCksIDIp
KSB8IDAsIDE0KTsKCiAgICAgIGlmIChncmlkQ2hlY2soZ3JpZCwgaSwgaiwgIjoi
KSkgewogICAgICAgIHBsYWNlVGlsZShpLCBqLCAoNCAqIHBvdyhyYW5kb20oKSwg
ZykpIHwgMCwgMyk7CiAgICAgIH0gZWxzZSB7CiAgICAgICAgZHJhd0NvbnRleHQo
Z3JpZCwgaSwgaiwgInciLCA5LCAzLCB0cnVlKTsKICAgICAgfQoKICAgICAgaWYg
KGdyaWRDaGVjayhncmlkLCBpLCBqLCAiLiIpKSB7CiAgICAgICAgcGxhY2VUaWxl
KGksIGosICg0ICogcG93KHJhbmRvbSgpLCBnKSkgfCAwLCAwKTsKICAgICAgfSBl
bHNlIHsKICAgICAgICBkcmF3Q29udGV4dChncmlkLCBpLCBqLCAiLiIsIDQsIDAp
OwogICAgICB9CiAgICB9CiAgfQp9CgpmdW5jdGlvbiBkcmF3Q29udGV4dChncmlk
LCBpLCBqLCB0YXJnZXQsIGR0aSwgZHRqLCBpbnZlcnQgPSBmYWxzZSkgewogIGxl
dCBjb2RlID0gZ3JpZENvZGUoZ3JpZCwgaSwgaiwgdGFyZ2V0KTsKICBpZiAoaW52
ZXJ0KSB7CiAgICBjb2RlID0gfmNvZGUgJiAweGY7CiAgfQogIGxldCBbdGksdGpd
ID0gbG9va3VwW2NvZGVdOwogIHBsYWNlVGlsZShpLCBqLCBkdGkgKyB0aSwgZHRq
ICsgdGopOwp9CgoKCmZ1bmN0aW9uIGdyaWRDb2RlKGdyaWQsIGksIGosIHRhcmdl
dCkgewogIHJldHVybiAoCiAgICAoZ3JpZENoZWNrKGdyaWQsIGkgLSAxLCBqLCB0
YXJnZXQpIDw8IDApICsKICAgIChncmlkQ2hlY2soZ3JpZCwgaSwgaiAtIDEsIHRh
cmdldCkgPDwgMSkgKwogICAgKGdyaWRDaGVjayhncmlkLCBpLCBqICsgMSwgdGFy
Z2V0KSA8PCAyKSArCiAgICAoZ3JpZENoZWNrKGdyaWQsIGkgKyAxLCBqLCB0YXJn
ZXQpIDw8IDMpCiAgKTsKfQoKZnVuY3Rpb24gZ3JpZENoZWNrKGdyaWQsIGksIGos
IHRhcmdldCkgewogIGlmIChpID49IDAgJiYgaSA8IGdyaWQubGVuZ3RoICYmIGog
Pj0gMCAmJiBqIDwgZ3JpZFtpXS5sZW5ndGgpIHsKICAgIHJldHVybiBncmlkW2ld
W2pdID09IHRhcmdldDsKICB9IGVsc2UgewogICAgcmV0dXJuIGZhbHNlOwogIH0K
fQoKY29uc3QgbG9va3VwID0gWwogIFsxLCAxXSwKICBbMSwgMF0sIC8vIGJvdHRv
bQogIFswLCAxXSwgLy8gcmlnaHQKICBbMCwgMF0sIC8vIHJpZ2h0K2JvdHRvbQog
IFsyLCAxXSwgLy8gbGVmdAogIFsyLCAwXSwgLy8gbGVmdCtib3R0b20KICBbMSwg
MV0sCiAgWzEsIDBdLCAvLyAqIAogIFsxLCAyXSwgLy8gdG9wCiAgWzEsIDFdLAog
IFswLCAyXSwgLy8gcmlnaHQrdG9wCiAgWzAsIDFdLCAvLyAqCiAgWzIsIDJdLCAv
LyB0b3ArbGVmdAogIFsyLCAxXSwgLy8gKgogIFsxLCAyXSwgLy8gKgogIFsxLCAx
XQpdOw==
`))
}


function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}
