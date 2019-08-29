class Polygon{
	constructor(points){
		this.points = points;
		this.bounds = [];
		this.pos = pos; //centroid
		this.mass = 0.75;
		this.damping = 0.1;
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxVel = createVector(5, 5);
	}

	setCentreOfMass(){
		let numPoints = this.points.length;
		var centroid = createVector(0, 0);
		for (var point of this.points){
			centroid.x + point.x;
			centroid.y + point.y;
		}

		centroid.x/numPoints;
		centroid.y/numPoints;

		this.pos = centroid;
	}

	setBounds(){
		for (var i = 0; i < this.points.length - 1; i++){
			var bStart = createVector(this.points[i].x, this.points[i].y);
			var bEnd = createVector(this.points[i+1].x, this.points[i+1].y);
			var b = new Boundary(bStart, bEnd);
			this.bounds.push(b);
		}
		var bStart = createVector(this.points[this.points.length-1].x,
							      this.points[this.points.length-1].y);

		var bEnd = createVector(this.points[0].x, this.points[0].y);
		var b = new Boundary(bStart, bEnd);
		this.bounds.push(b);
	}




	update(){
		this.vel.x = this.acc.x/this.mass;
		this.vel.y = this.acc.y/this.mass;
		
		this.pos.x = this.pos.x + this.vel.x;
		this.pos.y = this.pos.y + this.vel.y;
	}

	draw(){
		for (var bound of this.bounds){
			bound.drawFancy();
		}
	}
}