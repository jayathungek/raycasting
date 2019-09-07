let NORMAL_MODE = 0;
let FREEDRAW_MODE = 1;
let POLY_MODE = 2;
let LEFT_KEY = 37; // p5.js keycodes
let RIGHT_KEY = 39;
let UP_KEY = 38;
let DOWN_KEY = 40;
let FREEDRAW_MODE_MSG = "Free draw mode";
let POLY_MODE_MSG = "Polygon draw mode";

let light;
var walls = [];
var prey = [];

let w = 600;
let h = 600;
let TEXT_X = w - 150;
let TEXT_Y = 20;
let POS_TEXT_X = w - 150;
let POS_TEXT_Y = 35;
let TEXT_SIZE = 15;
var buildMode;
var boundaryStarted;
var newBoundStart = null;
var newBoundInt = null;
var newBoundEnd = null;
var MODE;

function setup() {
	createCanvas(w, h);
	MODE = NORMAL_MODE
	boundaryStarted = false;
	var pos = createVector(w/2, h/2);
	boundRoom();
	
	var v_wallstart = createVector(100, 100);
	var v_wallend = createVector(100, 300);
	var v_wall = new Boundary(v_wallstart, v_wallend);

	var h_wallstart = createVector(200, 100);
	var h_wallend = createVector(500, 100);
	var h_wall = new Boundary(h_wallstart, h_wallend);

	// walls.push(h_wall);
	// walls.push(v_wall);


	light = new Source(pos);
	light.populateRays();

	for (var i = 0; i < 1; i++){
		var preyPos = createVector((1+i)*100, (1+i)*100);
		var newPrey = new Prey(preyPos);
		prey.push(newPrey);
	}

}

function draw() {
	background(0);
	var mousePos = createVector(mouseX, mouseY);
	light.decayAcceleration();
	if(MODE != NORMAL_MODE){

	}else{
		if(keyIsDown(UP_KEY)){
			light.setAccWithKeys(UP_KEY, mousePos);
		}

		if(keyIsDown(DOWN_KEY)){
			light.setAccWithKeys(DOWN_KEY, mousePos);
		}

		if(keyIsDown(LEFT_KEY)){
			light.setAccWithKeys(LEFT_KEY, mousePos);
		}

		if(keyIsDown(RIGHT_KEY)){
			light.setAccWithKeys(RIGHT_KEY, mousePos);
		}
		light.collide(walls);
		light.updateHeading(mousePos);
		light.update();
	}
	displayMode();
	light.castRays(walls);
	light.draw();
	
	for(var wall of walls){
		if(MODE != NORMAL_MODE){
			wall.draw();	
		}else{
			wall.drawFancy();
		}
		wall.collisionPoints=[];
	}

	for(var p of prey){
		p.draw(light);
	}
}

function boundRoom(){
	let topLeft = createVector(0, 0);
	let topRight = createVector(w-1, 0);
	let bottomLeft = createVector(0, h-1);
	let bottomRight = createVector(w-1, h-1);

	let top = new Boundary(topLeft, topRight);
	let bottom = new Boundary(bottomLeft, bottomRight);
	let left = new Boundary(topLeft, bottomLeft);
	let right = new Boundary(topRight, bottomRight);

	walls.push(top, bottom, left, right);
}

function keyPressed(){
	if (keyCode == SHIFT){
		switchMode();
		switch(MODE){
			case NORMAL_MODE:

			case FREEDRAW_MODE:

			case POLY_MODE:

			default:
				break;

		}
		console.log("MODE: ", MODE);
	}else if(keyCode == CONTROL){
		light.switchRays();
		console.log("toggle Rays");
	}
}

function mouseDragged(){
	if(MODE == FREEDRAW_MODE){
		var mousePos = createVector(mouseX, mouseY);
		if(!boundaryStarted){
			boundaryStarted = true;
			newBoundStart = mousePos;
		}else{
			if(newBoundInt != null){
				walls.pop();
			}
			newBoundInt = mousePos;
			var newWall = new Boundary(newBoundStart, newBoundInt);
			walls.push(newWall);
		}
	}
}

function mouseClicked(){
	if(MODE == FREEDRAW_MODE){
		var mousePos = createVector(mouseX, mouseY);
		if(!boundaryStarted){
			boundaryStarted = true;
			newBoundStart = mousePos;
		}else{
			boundaryStarted = false;
			newBoundStart = null;
			newBoundInt = null;
			newBoundEnd = null;
		}
	}
}

function mouseMoved(){
	if((MODE == FREEDRAW_MODE) && boundaryStarted && (newBoundStart != null)){
		if(newBoundInt != null){
			walls.pop();
		}
		var mousePos = createVector(mouseX, mouseY);
		newBoundInt = mousePos;
		var newWall = new Boundary(newBoundStart, newBoundInt);
		walls.push(newWall);
	}
}

function switchMode(){
	MODE = (MODE + 1) % 3;
}

function displayMode(){
	textSize(TEXT_SIZE);
	fill(255);
	stroke(255);
	let pos = "("+mouseX+", "+mouseY+")";
	switch(MODE){
		case FREEDRAW_MODE:
			text(FREEDRAW_MODE_MSG, TEXT_X, TEXT_Y);
			text(pos, POS_TEXT_X, POS_TEXT_Y);
			break;
		
		case POLY_MODE:
			text(POLY_MODE_MSG, TEXT_X, TEXT_Y);
			text(pos, POS_TEXT_X, POS_TEXT_Y);
			break;

		default:
			break;

	}
}


// function mouseReleased(){
// 	if(boundaryStarted && (newBoundStart != null) && buildMode ){
// 		boundaryStarted = false;
// 		var mousePos = createVector(mouseX, mouseY);
// 		newBoundEnd = mousePos;
// 		var newWall = new Boundary(newBoundStart, newBoundEnd);
// 		walls.push(newWall);
// 		newBoundStart = null;
// 		newBoundInt = null;
// 		newBoundEnd = null;
// 	}
	
	
// }