class Ray{
	constructor(pos, angle){
		this.pos = pos;
		this.dir = p5.Vector.fromAngle(angle);
		this.col = null;
	}

	lookAt(newPos){
		this.dir.x = newPos.x - this.pos.x;
		this.dir.y = newPos.y - this.pos.y;
		this.dir.normalize(); 
	}

	cast(boundaries){
		var closest = Infinity;
		var collision = null;
		var bound = null;
		for(let boundary of boundaries){
			let x1 = boundary.start.x;
			let y1 = boundary.start.y;
			let x2 = boundary.end.x;
			let y2 = boundary.end.y;

			let x3 = this.pos.x;
			let y3 = this.pos.y;
			let x4 = this.pos.x + this.dir.x;
			let y4 = this.pos.y + this.dir.y;

			let denominator = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
			if (denominator == 0){
				continue; //parallel lines
			}

			let t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4))/denominator; //wall
			let u = -((x1- x2)*(y1 - y3) - (y1 - y2)*(x1 - x3))/denominator; //ray

			if(t > 0 && t < 1 && u > 0){
				let pt = createVector(0, 0);
				pt.x = x1 + t*(x2 - x1);
				pt.y = y1 + t*(y2 - y1);

				if (u < closest){
					closest = u;
					collision = pt;
					bound = boundary;
				}
				
			}		
		}
		this.col = collision;
		return bound;
	}

	draw(){
		stroke(255, 30);
		if(this.col != null){
			line(this.pos.x, this.pos.y, 
			     this.col.x, this.col.y);
		}
	}
}