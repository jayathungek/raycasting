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

}