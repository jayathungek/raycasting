class Source{
	constructor(pos){
		this.pos = pos;
		this.mass = 0.75;
		this.damping = 0.15;
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxVel = createVector(5, 5);
		this.rayGap = 0.3; // degrees
		this.fov = 100 //degrees
		this.rays = [];
		this.toggleRays = false;
		this.mouseLag = 50; // deprecated
		this.isAccelerating = false;
		this.accStep = 1.2;
		this.decStep = 0.05;
		this.heading = 0; //degrees
		this.radius = 10;
	}

	populateRays(){
		for(let angle = 0; angle < this.fov; angle += this.rayGap){
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

	createImpulse(dir, multX, multY){
		this.acc.x = (multX + this.accStep)*dir.x;
		this.acc.y = (multY + this.accStep)*dir.y;
	}

	collide(boundaries){
		for (var b of boundaries){
			let line = b;
			let x0 = this.pos.x;
			let y0 = this.pos.y;

			if (Util.collides(line, this)){
				let lineEq = Util.getLineCoefficients(line);
				let k = Util.getCircleCoefficient(this.pos, this.radius);
				var coord;				
				if(!line.isVertical()){
					let a = 1 + Math.pow(lineEq.m, 2);
					let b = (2*lineEq.m*lineEq.c) - (2*x0) - (2*lineEq.m*y0);
					let c = k + Math.pow(lineEq.c, 2) - (2*lineEq.c*y0);
					let q = Util.solveQuadratic(a, b, c);
					coord = Util.getCoord(lineEq.m, q, lineEq.c);
				}else{
					coord = createVector(line.start.x, y0);
				}
				
				let dir = p5.Vector.sub(this.pos, coord).normalize();
				let multX = -Math.abs(this.acc.x);
				let multY = -Math.abs(this.acc.y);

				this.createImpulse(dir, multX, multY);
				console.log("collision at (", coord.x, ", ", coord.y, ")");
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

	setAccWithKeys(key, mousePos){
		var dir;
		if (key == UP_KEY){
			dir = p5.Vector.sub(mousePos, this.pos).normalize();
			this.acc.x = dir.x*this.accStep;
			this.acc.y = dir.y*this.accStep;
		}else if (key == LEFT_KEY){
			this.acc.x = -this.accStep;
		}else if (key == DOWN_KEY){
			dir = p5.Vector.sub(mousePos, this.pos).normalize();
			this.acc.x = -dir.x*this.accStep;
			this.acc.y = -dir.y*this.accStep;
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
		let xVel = this.acc.x/this.mass;
		let yVel = this.acc.y/this.mass; 
		
		if(xVel < this.maxVel.x){
			this.pos.x = this.pos.x + xVel;
		}else{
			this.pos.x = this.pos.x + this.maxVel.x;
		}

		if(yVel < this.maxVel.y){
			this.pos.y = this.pos.y + yVel;
		}else{
			this.pos.y = this.pos.y + this.maxVel.y;
		}
		

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
		ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
		
	}
}