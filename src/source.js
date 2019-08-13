class Source{
	constructor(pos){
		this.mass = 0.75;
		this.pos = pos;
		this.damping = 0.1;
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxVel = createVector(5, 5);
		this.rayGap = 0.3; // degrees
		this.rays = [];
		this.toggleRays = false;
		this.mouseLag = 50; // deprecated
		this.isAccelerating = false;
		this.accStep = 2;
		this.decStep = 0.05;
		this.heading = 0; //degrees
	}

	populateRays(){
		for(let angle = 0; angle < 90; angle += this.rayGap){
			let newRay = new Ray(this.pos, radians(angle));
			this.rays.push(newRay);
		}
	}
	
	castRays(boundaries){
		if(this.toggleRays){
			var lastBound = null;
			for(let ray of this.rays){
				var collidingBound = ray.cast(boundaries);
				if(collidingBound != null){
					if(lastBound == null){
						lastBound = collidingBound;
					}else{
						if(lastBound != collidingBound){
							lastBound.collisionPoints.push(null);
							collidingBound.collisionPoints.push(ray.col);
							lastBound = collidingBound;
							continue;
						}
						lastBound = collidingBound;
					}
					collidingBound.collisionPoints.push(ray.col);
					
				}
			}
		}
	}

	setAccWithMouse(newPos){
		var dist = p5.Vector.dist(newPos, this.pos);
		var dX = newPos.x - this.pos.x;
		var dY = newPos.y - this.pos.y;

		this.acc.x = dX * this.damping;
		this.acc.y = dY * this.damping;		
	}

	setAccWithKeys(key){
		if (key == UP_KEY){
			this.acc.y = -this.accStep;
		}else if (key == LEFT_KEY){
			this.acc.x = -this.accStep;
		}else if (key == DOWN_KEY){
			this.acc.y = this.accStep;
		}else if (key == RIGHT_KEY){
			this.acc.x = this.accStep;
		}
	}

	decayAcceleration(){
		if(this.acc.y > 0){
			this.acc.y -= this.decStep;
			if (this.acc.y < 0){
				this.acc.y = 0;
			}

		}else if (this.acc.y < 0){
			this.acc.y -= -this.decStep;
			if(this.acc.y > 0){
				this.acc.y = 0;
			}
		}

		if(this.acc.x > 0){
			this.acc.x -= this.decStep;
			if (this.acc.x < 0){
				this.acc.x = 0;
			}

		}else if (this.acc.x < 0){
			this.acc.x -= -this.decStep;
			if(this.acc.x > 0){
				this.acc.x = 0;
			}
		}
	}


	update(){
		this.vel.x = this.acc.x/this.mass;
		this.vel.y = this.acc.y/this.mass;
		
		this.pos.x = this.pos.x + this.vel.x;
		this.pos.y = this.pos.y + this.vel.y;

		this.updateRayPositionAndHeading();
		
		
	}

	switchRays(){
		this.toggleRays = !this.toggleRays;
	}

	updateHeading(mousePos){
		var headingVector = createVector(mousePos.x - this.pos.x, mousePos.y - this.pos.y)
		this.heading = degrees(headingVector.heading());
	}

	updateRayPositionAndHeading(){
		var currHeading = this.heading - ((this.rays.length/2)*this.rayGap);
		for(let ray of this.rays){
			ray.pos = this.pos;
			ray.dir = p5.Vector.fromAngle(radians(currHeading));
			currHeading += this.rayGap;
		}
	}

	draw(){
		if(this.toggleRays){
			fill(255);
			for(let ray of this.rays){
				ray.draw();
			}
		}else{
			fill(100);
		}
		noStroke();
		ellipse(this.pos.x, this.pos.y, 20, 20);
		
	}
}