class Prey{
	constructor(pos){
		this.pos = pos;
		this.mass = 0.75;
		this.damping = 0.15;
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxVel = createVector(5, 5);
		this.toggleRays = false;
		this.mouseLag = 50; // deprecated
		this.isAccelerating = false;
		this.accStep = 1.2;
		this.decStep = 0.05;
		this.radius = 10;
		this.foundColour = color("#919191");
	}

	draw(seeker){
		if(Util.withinLineOfSight(this, seeker)){
			fill(this.foundColour);
		}else{
			noFill();
		}
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
	}
}