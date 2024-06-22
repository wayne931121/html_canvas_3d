let r_from_keyboard=0,l_from_keyboard=0,u_from_keyboard=0,d_from_keyboard=0,timeid,blood=100,beated=0,heal=0;
let f_from_keyboard=0,h_from_keyboard=0,t_from_keyboard=0,g_from_keyboard=0,v_from_keyboard=0,b_from_keyboard=0;
let n_from_keyboard=0,m_from_keyboard=0;

function keyboard(){
        if(r_from_keyboard){a.x+= speed;bindToInput(a);}
	    if(l_from_keyboard){a.x+=-speed;bindToInput(a);}
	    if(u_from_keyboard){a.y+=-speed;bindToInput(a);}
	    if(d_from_keyboard){a.y+= speed;bindToInput(a);}
		if(f_from_keyboard){a.setYaw(0,-a.speed);bindToInput(a);}
		if(h_from_keyboard){a.setYaw(0,+a.speed);bindToInput(a);}
		if(t_from_keyboard){a.setYaw(1,-a.speed);bindToInput(a);}
		if(g_from_keyboard){a.setYaw(1,+a.speed);bindToInput(a);}
		if(v_from_keyboard){a.setYaw(2,-a.speed);bindToInput(a);}
		if(b_from_keyboard){a.setYaw(2,+a.speed);bindToInput(a);}
		if(n_from_keyboard){a.z -= a.speed*3;bindToInput(a);}
		if(m_from_keyboard){a.z += a.speed*3;bindToInput(a);}
		InputChangeObject(a);
		a.validYaw();
}

window.addEventListener('keydown', function(event) {
    let key=event.key;
	//console.log(key);
	switch (key){
	    case "ArrowRight":
		case "d":
		    r_from_keyboard=1;
			break;
		case "ArrowLeft":
		case "a":
		    l_from_keyboard=1;
			break;
		case "ArrowUp":
		case "w":
		    u_from_keyboard=1;
			break;
		case "ArrowDown":
		case "s":
		    d_from_keyboard=1;
			break;
		case "f":
		    f_from_keyboard = 1;
			break;
		case "h":
		    h_from_keyboard = 1;
			break;
		case "t":
		    t_from_keyboard = 1;
			break;
		case "g":
		    g_from_keyboard = 1;
			break;
		case "v":
		    v_from_keyboard = 1;
			break;
		case "b":
		    b_from_keyboard = 1;
			break;
		case "n":
		    n_from_keyboard = 1;
			break;
		case "m":
		    m_from_keyboard = 1;
			break;
		default:
		    null;
	}
});
window.addEventListener('keyup', function(event) {
    let key=event.key;
	console.log(key);
	switch (key){
	    case "ArrowRight":
		case "d":
		    r_from_keyboard=0;
			break;
		case "ArrowLeft":
		case "a":
		    l_from_keyboard=0;
			break;
		case "ArrowUp":
		case "w":
		    u_from_keyboard=0;
			break;
		case "ArrowDown":
		case "s":
		    d_from_keyboard=0;
			break;
		case "f":
		    f_from_keyboard = 0;
			break;
		case "h":
		    h_from_keyboard = 0;
			break;
		case "t":
		    t_from_keyboard = 0;
			break;
		case "g":
		    g_from_keyboard = 0;
			break;
		case "v":
		    v_from_keyboard = 0;
			break;
		case "b":
		    b_from_keyboard = 0;
			break;
	    case "n":
		    n_from_keyboard = 0;
			break;
		case "m":
		    m_from_keyboard = 0;
			break;
		default:
		    null;
	}
});