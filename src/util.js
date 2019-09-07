class Util{
	static solveQuadratic(a, b, c){
		if(Math.pow(b, 2) >= (4*a*c)){
			var result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
		    var result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);

		    return {sol1: result, sol2: result2};
		}else{
			return "no real roots";
		}
	}

	static getCircleCoefficient(pos, radius){
		return Math.pow(pos.x, 2) + Math.pow(pos.y, 2) -
			   Math.pow(radius, 2);
	}

	static getLineCoefficients(line){
		var m, c;
		if(!line.isVertical()){
			m = (line.end.y - line.start.y)/(line.end.x - line.start.x);
			c = line.end.y - (m*line.end.x);
		}else{
			m = "v";
			c = "v";
		}
		return {m: m, c: c};
	}

	static getCoord(m, results, c){
		var coord = createVector((results.sol1+results.sol2)/2, m*((results.sol1+results.sol2)/2) + c)
		return coord;

	}

	static withinSegment(boundary, pos){
		let x0 = pos.x;
		let y0 = pos.y;

		let x1 = (boundary.start.x < boundary.end.x) ? boundary.start.x : boundary.end.x;
		let y1 = (boundary.start.y < boundary.end.y) ? boundary.start.y : boundary.end.y;

		let x2 = (boundary.end.x > boundary.start.x) ? boundary.end.x : boundary.start.x;
		let y2 = (boundary.end.y > boundary.start.y) ? boundary.end.y : boundary.start.y;

		let withinboundsX = (x0 > x1 && x0 < x2);
		let withinboundsY = (y0 > y1 && y0 < y2);

		if(boundary.isHorizontal()){
			return withinboundsX;

		}else if(boundary.isVertical()){
			return withinboundsY;

		}else{
			return withinboundsX && withinboundsY;

		}
	}

	static collides(boundary, object){
		let x0 = object.pos.x;
		let y0 = object.pos.y;

		let x1 = boundary.start.x;
		let y1 = boundary.start.y;

		let x2 = boundary.end.x;
		let y2 = boundary.end.y;

		let denominator = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
		let numerator = Math.abs( (x0 * (y2 - y1)) - (y0 * (x2 - x1)) + (x2 * y1) - (y2 * x1));
		let distance = numerator/denominator;

		return (distance <= object.radius) && Util.withinSegment(boundary, object.pos);

	}

	static withinLineOfSight(hider, seeker){
		let x_start = seeker.pos.x + seeker.rays[0].dir.x;
		let y_start = seeker.pos.y + seeker.rays[0].dir.y;
		let startVector = createVector(x_start, y_start);

		let scale = 50;
		let x_end = seeker.rays[seeker.rays.length-1].pos.x + scale*seeker.rays[seeker.rays.length-1].dir.x;
		let y_end = seeker.rays[seeker.rays.length-1].pos.y + scale*seeker.rays[seeker.rays.length-1].dir.y; 
		let endVector = createVector(x_end, y_end);
		
		// stroke(color("#FF0000"));
		// line(seeker.pos.x, seeker.pos.y, seeker.pos.x+seeker.rays[0].dir.x*scale, seeker.pos.y+seeker.rays[0].dir.y*scale);
		// stroke(color("#0089FF"));
		// line(seeker.pos.x, seeker.pos.y, seeker.pos.x+seeker.rays[seeker.rays.length-1].dir.x*scale, seeker.pos.y+seeker.rays[seeker.rays.length-1].dir.y*scale);

		let angleArea = (startVector.copy().sub(seeker.pos)).angleBetween(endVector.copy().sub(seeker.pos));

		let angleBetweenSandH = (startVector.copy().sub(seeker.pos)).angleBetween(hider.pos.copy().sub(seeker.pos));
		let angleBetweenEandH = (endVector.copy().sub(seeker.pos)).angleBetween(hider.pos.copy().sub(seeker.pos));

		return (angleBetweenEandH < angleArea && angleBetweenSandH < angleArea && seeker.toggleRays);
	}

}