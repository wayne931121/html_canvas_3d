# html_canvas_3d
The html project try to create 3D cube using pure canvas. 

Euler Rotation:

```js
//Rotate the surface formed by the Horizontal and Vertical axes A degrees
//Equal to Rotate the third axis

angleHV(cosA,sinA,h,v){
   return [h*cosA-v*sinA, h*sinA+v*cosA];
}
```
```js
//Using
//Euler XYZ rotation, equal to ZY'X'' rotation

a=angle[0], b=angle[1], c=angle[2];
x=position[0], y=position[1], z=position[2];
let cosA=cos(a),sinA=sin(a), cosB=cos(b),sinB=sin(b), cosC=cos(c),sinC=sin(c);
let zy, xz, xy;
zy = this.angleHV(cosA,sinA,z,y); //轉動zy平面，等於轉動x軸，x不變
xz = this.angleHV(cosB,sinB,x,zy[0]); //轉動xz平面，等於轉動y軸，y不變
xy = this.angleHV(cosC,sinC,xz[0],zy[1]); //轉動xy平面，等於轉動z軸，z不變
p = [xy[0],xy[1],xz[1]];
```
```js
//Math
const sin = function(radian){return Math.sin(radian);}
const cos = function(radian){return Math.cos(radian);}
const radian = function(angle){return angle*Math.PI/180;}
```
Also See:<br>
https://en.wikipedia.org/wiki/Rotation_matrix<br>
https://www.geogebra.org/classic/tyeaC3WS<br>
https://www.geogebra.org/3d/rfegqba8<br>
https://youtu.be/U0_ONQQ5ZNM?si=bPz4oSSNwQVz5KON
