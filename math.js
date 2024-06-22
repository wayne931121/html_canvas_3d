const sin = function(radian){return Math.sin(radian);}
const cos = function(radian){return Math.cos(radian);}
const tan = function(radian){if(radian==pi/2){return NaN;}else{return Math.tan(radian);}}
const radian = function(angle){return angle*Math.PI/180;}
const abs = function(value){return Math.abs(value);}
const pi = Math.PI;

const MathLine = function(x1,y1,x2,y2){
    //y=mx+b
    m=(y2-y1)/(x2-x1);
	b=y1-m*x1;
	return [m,b];
}
const MathLineDeltax = function(m,b,deltax,deltay){
    //y=m(x-deltax)+b+deltay
    b+=m*(-deltax)+deltay;
	return [m,b];
}