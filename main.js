const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const degreeX = document.getElementById("degreeX");
const degreeY = document.getElementById("degreeY");
const degreeZ = document.getElementById("degreeZ");
const degreeA = document.getElementById("degreeA");
const degreeB = document.getElementById("degreeB");
const degreeC = document.getElementById("degreeC");

function startPaint(){
    ctx.beginPath();
}
function createline(x1,y1,x2,y2){
    ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
}
function draw(){
    ctx.stroke();
}

let r = 45;
const a = new pixel(r);
degreeX.max = canvas.width+r*2 , degreeX.min = -r*2;
degreeY.max = canvas.height+r*2, degreeY.min = -r*2;

function clearAll(){
    ctx.reset();
}
function drawAll(){
    if(lock){clearInterval(timeid);return;/*上鎖後即時停止*/}
    clearAll();
	keyboard();
    a.draw();
}

function debug(){
    lock=true;
}
function start(){
    lock=false;
    timeid = setInterval(drawAll,10);
}
function stop(){
    lock=true;
}

let x,y,w=210,h=297,speed=10,lock=false

window.onload = (e)=> {
  bindToInput(a);
  timeid = setInterval(drawAll,10);
}

function Reset(){
  a.Reset();
  bindToInput(a);
}

function InputChangeObject(obj){
    obj.x=parseInt(degreeX.value);
	obj.y=parseInt(degreeY.value);
	obj.z=parseInt(degreeZ.value);
	obj.yaw[0]=parseInt(degreeA.value);
	obj.yaw[1]=parseInt(degreeB.value);
	obj.yaw[2]=parseInt(degreeC.value);
}

function bindToInput(obj){
    degreeX.value = obj.x;
	degreeY.value = obj.y;
	degreeZ.value = obj.z;
	degreeA.value = obj.yaw[0];
	degreeB.value = obj.yaw[1];
	degreeC.value = obj.yaw[2];
}