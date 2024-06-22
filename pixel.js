let pixelDebug;

class pixel{
  x=300;
  y=162;
  z=2100; //z > 2*r
  speed=1;
  yaw=[0,0,0];
  screen_distance_from_eye=3000;
  constructor(a,x,y){
	this.r = a;
  }
  draw(){
	  this.drawRect();
  }
  update(){
  }
  set(x,y){
    this.x = x;
	this.y = y;
  }
  setYaw(key,value){
	  if(key==0){this.yaw[0] += value;}
	  if(key==1){this.yaw[1] += value;}
	  if(key==2){this.yaw[2] += value;}
	  this.validYaw();
  }
  get(){
    return [this.x,this.y];
  }
  detect(a,b){
  }
  reset(){
    this.x=300;
    this.y=100;
    this.z=2100;// z > 2*r
    this.yaw=[0,0,0];
  }
  validYaw(){
	this.yaw = this.validYawAnglePoint(this.yaw);
  }
  validYawAnglePoint(pointyaw){
    return [this.validAngle(pointyaw[0]),this.validAngle(pointyaw[1]),this.validAngle(pointyaw[2])];
  }
  validAngle(angle){
    if(angle>=360){angle%=360;}
	else if(angle<0){angle=360+angle%360;}
    return angle;
  }
  drawPlane(p1,p2,p3,p4,fill){
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(p1[0],p1[1]);
	ctx.lineTo(p2[0],p2[1]);
	ctx.lineTo(p3[0],p3[1]);
	ctx.lineTo(p4[0],p4[1]);
	ctx.lineTo(p1[0],p1[1]);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
  }
  drawLine(p1,p2){
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(p1[0],p1[1]);
	ctx.lineTo(p2[0],p2[1]);
	ctx.closePath();
	ctx.stroke();
  }
  drawPoint(p1){
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(p1[0],p1[1]);
	ctx.lineTo(p1[0]+1,p1[1]+1);
	ctx.closePath();
	ctx.stroke();
  }
  drawRect(){
	this.createRectDraw(this.r);
	//this.drawPoint([this.x,this.y]); 畫出物件原點(中點)
  }
  planeZcenter(p1,p2,p3,p4){/*point:[x,y,z]*/
	  return (p1[2]+p2[2]+p3[2]+p4[2])/4;
  }
  createRectDraw(r){
    let i;
	this.linePoints = [];
	this.planePoints = [];
    this.tryDrawAxis(r, "xyz",  1);
	this.tryDrawAxis(r, " y ", -1);
	this.tryDrawAxis(r, "xy ", -1);
	this.tryDrawAxis(r, "x  ", -1);
	this.tryDrawAxis(r, "  z", -1);
	this.tryDrawAxis(r, " yz", -1);
	this.tryDrawAxis(r, "xyz", -1);
	this.tryDrawAxis(r, "x z", -1);
	//console.log(JSON.stringify(this.planePoints)); //if not to json the reverse will impact above
	//pixelDebug = this.planePoints;
	for(i in this.planePoints){
		let color = this.planePoints[i][4];
		let arr = [this.planePoints[i][0],this.planePoints[i][1],this.planePoints[i][2],this.planePoints[i][3]];
		arr.sort((a,b)=>  {return a[2]-b[2];/*由小到大*/});
		//console.log(JSON.stringify(arr));
		this.planePoints[i] = [arr[0],this.planePoints[i]];
	}
	this.planePoints.sort((a,b)=>  {return b[0][2]-a[0][2];/*由大到小*/});
	//this.planePoints.reverse(); /*!!!*/
	//console.log(JSON.stringify(this.planePoints));
	//debug();
	for(i in this.planePoints){
		this.drawPlane.apply(this,this.planePoints[i][1]);
	}
  }
  tryDrawAxis(r, ais, direction){
    /* ais:x,y,z, etc; direction:+1,-1;*/
    let x=r, y=r, z=r;
	let a,b,c,d,e,f,g,h;
    if(ais.search("x")!=-1){x *= direction;}
	if(ais.search("y")!=-1){y *= direction;}
	if(ais.search("z")!=-1){z *= direction;}
	/*
	z axis positive side
	  f---------h   |	  h---------f
	 .|        .|   |	 .|        .|
	b-|-------d |   |	d-|-------b |
	| |       | |   |	| |       | | 
	| e-------|-g   |	| g-------|-e     ^
	|.        |.    |	|.        |.     .
	a---------c     |	c---------a     .
   -----------------|------------------.
	  e---------g   |	  g---------e
	 .|        .|   |	 .|        .|
	a-|-------c |   |	c-|-------a |
	| |       | |   |	| |       | | 
	| f-------|-h   |	| h-------|-f
	|.        |.    |	|.        |. 
	b---------d     |	d---------b  
	
	z axis negative side
	  b---------d   |	  d---------b
	 .|        .|   |	 .|        .|
	f-|-------h |   |	h-|-------f |
	| |       | |   |	| |       | | 
	| a-------|-c   |	| c-------|-a 
	|.        |.    |	|.        |.   
	e---------g     |	g---------e    
   -----------------|-----------------------
	  a---------c   |	  c---------a     ^
	 .|        .|   |	 .|        .|    .
	e-|-------g |   |	g-|-------e |   .
	| |       | |   |	| |       | |  .
	| b-------|-d   |	| d-------|-b  
	|.        |.    |	|.        |. 
	f---------h     |	h---------f  
	*/
	a = this.tryDraw([x,0,0]);
	b = this.tryDraw([x,y,0]);
	c = this.tryDraw([0,0,0]);
	d = this.tryDraw([0,y,0]);
	e = this.tryDraw([x,0,z]);
	f = this.tryDraw([x,y,z]);
	g = this.tryDraw([0,0,z]);
	h = this.tryDraw([0,y,z]);
	//this.planePoints.push([d,b,a,c,"black"]); 在裡面的面看不到
	this.planePoints.push([h,f,e,g,"red"]);
	this.planePoints.push([h,f,b,d,"blue"]);
	//this.planePoints.push([g,e,a,c,"aqua"]); 在裡面的面看不到
	this.planePoints.push([b,f,e,a,"green"]);
	//this.planePoints.push([d,h,g,c,"white"]); 在裡面的面看不到
  }
  tryDraw(p){
	let a=radian(this.yaw[0]), b=radian(this.yaw[1]), c=radian(this.yaw[2]), x=p[0], y=p[1], z=p[2];
	//console.log(x,y);
	//https://en.wikipedia.org/wiki/Rotation_matrix
	let x1,y1,z1;
	x1 = (x*cos(c)-y*sin(c))*cos(b)+z*sin(b);
    y1 = (x*sin(c)+y*cos(c))*cos(a)-(z*cos(b)-(x*cos(c)-y*sin(c))*sin(b))*sin(a);
    z1 = (x*sin(c)+y*cos(c))*sin(a)+(z*cos(b)-(x*cos(c)-y*sin(c))*sin(b))*cos(a);
	p = [x1,y1,z1];
	p = this.eyes(p);
	//this.drawPoint(p);
	return p;
  }
  eyes(position){
    /*
	<!--
	Screen:
	x
	|
	|
	|
	---------y
	
	Object:
	
	         x   z
	         |  .
	         | .
	         |.
	------------------y
	        .|
           . |
		  .  |
    
	!!! Object Coordinates and Screen Coordinates Are Independent. !!!
	
	Follow https://en.wikipedia.org/wiki/Rotation_matrix,
	Object Coordinates is Point(x,y,z) defined in Object Coordinate System.
	Every Object Coordinates Base Is (0,0,0). (! Base is Center Point of Object. !)
	
	Screen Coordinates is Point(x,y,z) defined how an Object will be placed on screen.
	Screen Coordinates Only Displb (X,Y).
	We will transfer Object Coordinates(x,y,z) and Screen Coordinates(x,y,z) to Screen Displb Point(X,Y).
	
    Transfer:
	
	y   x
	|  .
	| .
	|.
	---------z
	                                           y
											   ^ (z,y)
	                                        -  |\
	                                     -     |
	                                  -        |
	                               -           |
	                            -              |
	                         -                 |
	                      -                    | Object Y
	                   -  |\                   |
	                -     |                    |
	             -        | Screen Y ?         |
	          -           |                    |
	       -              |/                   |/
	EYES.--------------------------------------->z
	    \\                /                    /
	         Distance1
			           Distance2
	
	EYES can be regarded as camera.
	Distance1 is distance between screen and eyes. => screen_distance_from_eye.
	Distance2 is distance between screen and objs. => this.z .
	Screen Y = Object Y × (Distance1÷Distance2)
	
	                                           x
											   ^ (z,x)
	                                        -  |\
	                                     -     |
	                                  -        |
	                               -           |
	                            -              |
	                         -                 |
	                      -                    | Object X
	                   -  |\                   |
	                -     |                    |
	             -        | Screen X ?         |
	          -           |                    |
	       -              |/                   |/
	EYES.--------------------------------------->z
	    \\                /                    /
	         Distance1
			           Distance2
	
	EYES can be regarded as camera.
	Distance1 is distance between screen and eyes. => screen_distance_from_eye.
	Distance2 is distance between screen and objs. => this.z .
	Screen X = Object X × (Distance1÷Distance2)
	
	Screen Position N is coordinate N that will be put on screen.
	Distance2 = Object Z + Screen Position Z
	-->
	*/
    let screen_distance_from_eye=this.screen_distance_from_eye, x=position[0],y=position[1],z=position[2];
	//scale will magnify the object.
	let screen_z = this.z-z; //screen position set to base (0,0,0), get z from base.
	x = (screen_distance_from_eye/screen_z*x); //transfer x and z to x. 
	y = (screen_distance_from_eye/screen_z*y); //transfer y and z to y. 
	x += this.x; //move object to screen x axis
	y += this.y; //move object to screen y axis
	//screen_z變數越大離螢幕(眼睛、我們)越遠
	position = [x,y,screen_z];
	return position;
  }
}