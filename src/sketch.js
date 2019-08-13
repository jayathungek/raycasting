let light;
let walls = [];
let w = 600;
let h = 600;
let LEFT_KEY = 37; // p5.js keycodes
let RIGHT_KEY = 39;
let UP_KEY = 38;
let DOWN_KEY = 40;
var buildMode;
var boundaryStarted;
var newBoundStart = null;
var newBoundInt = null;
var newBoundEnd = null;

function setup() {
	createCanvas(w, h);
	buildMode = true;
	boundaryStarted = false;
	var pos = createVector(w/2, h/2);
	boundRoom();

	light = new Source(pos);
	light.populateRays();
}

function draw() {
	background(0);
	var mousePos = createVector(mouseX, mouseY);
	light.decayAcceleration();
	if(buildMode){

	}else{
		// light.setAccWithMouse(mousePos);
		if(keyIsDown(UP_KEY)){
			light.setAccWithKeys(UP_KEY);
		}

		if(keyIsDown(DOWN_KEY)){
			light.setAccWithKeys(DOWN_KEY);
		}

		if(keyIsDown(LEFT_KEY)){
			light.setAccWithKeys(LEFT_KEY);
		}

		if(keyIsDown(RIGHT_KEY)){
			light.setAccWithKeys(RIGHT_KEY);
		}
		light.updateHeading(mousePos);
		light.update();
	}
	light.castRays(walls);
	light.draw();
	for(let wall of walls){
		// wall.draw();
		wall.drawFancy();
		wall.collisionPoints=[];
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

	walls.push(top);
	walls.push(bottom);
	walls.push(left);
	walls.push(right);
}

function keyPressed(){
	
	if (keyCode == SHIFT){
		buildMode = !buildMode;
		console.log("toggle buildMode");
	}else if(keyCode == CONTROL){
		light.switchRays();
		console.log("toggle Rays");
	}
}

function mouseDragged(){
	if(buildMode){
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
	if(buildMode){
		var mousePos = createVector(mouseX, mouseY);
		if(!boundaryStarted){
			boundaryStarted = true;
			newBoundStart = mousePos;
		}else{
			boundaryStarted = false;
			newBoundEnd = mousePos;
			var newWall = new Boundary(newBoundStart, newBoundEnd);
			walls.push(newWall);
			newBoundStart = null;
			newBoundInt = null;
			newBoundEnd = null;
		}
	}
}

function mouseMoved(){
	if(buildMode && boundaryStarted && (newBoundStart != null)){
		if(newBoundInt != null){
			walls.pop();
		}
		var mousePos = createVector(mouseX, mouseY);
		newBoundInt = mousePos;
		var newWall = new Boundary(newBoundStart, newBoundInt);
		walls.push(newWall);
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