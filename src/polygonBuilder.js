class PolygonBuilder{
	constructor(){
		this.pointThreshold = 50; //pixels
		this.startedPolygon = false;
		
		this.polygons = [];
		this.currPolygonPoints = [];
		this.polyStart = createVector(0, 0);

		this.vertexRadius = 2.5;
		this.vertexColour = color("#EDB4B4");

		this.newPolygonsExist = false;
	}

	addPoint(point){
		var point_rounded = Util.roundToNearest(point, this.pointThreshold);
		if (!this.startedPolygon){
			this.startedPolygon = true;
			this.polyStart = point_rounded;
		}else{
			if(Util.equals(point_rounded, this.polyStart) && (this.currPolygonPoints.length > 2)){
				this.startedPolygon = false;
				var newP = new Polygon(this.currPolygonPoints);
				newP.setCentreOfMass();
				newP.setBounds();
				this.polygons.push(newP);
				this.currPolygonPoints = [];
				this.newPolygonsExist = true;
				return true;
			}
		}
		this.currPolygonPoints.push(Util.roundToNearest(point, this.pointThreshold));
		console.log("added point: ", point_rounded.x, point_rounded.y);
		return false;
	}

	getPolygonsAsBoundaries(){
		var boundaries = [];
		for(var p of this.polygons){
			for (var b of p.bounds){
				boundaries.push(b);
			}
		}
		this.newPolygonsExist = false;
		return boundaries
	}

	

	// drawPolygons(){
		// for(var p of this.polygons){
		// 	p.draw();
		// }
	// }

	drawVertices(){
		fill(this.vertexColour);
		noStroke();
		for(var p of this.currPolygonPoints){
			ellipse(p.x, p.y, this.vertexRadius*2, this.vertexRadius*2);
		}
	}

}