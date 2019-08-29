class PolygonBuilder{
	constructor(){
		this.pointThreshold = 10; //pixels
		this.startedPolygon = false;
		
		this.polygons = [];
		this.currPolygonPoints = [];
		this.polyStart = createVector(0, 0);
	}

	addPoint(point){
		if (!this.startedPolygon){
			this.startedPolygon = true;
			this.polyStart = point;
		}else{
			if(this.equals(point, this.polyStart) && (this.currPolygonPoints.length > 2)){
				this.startedPolygon = false;
				this.currPolygonPoints.push(this.roundToNearest(point, this.pointThreshold));
				var newP = new Polygon(this.currPolygonPoints);
				this.polygons.push(newP);
				this.currPolygonPoints = [];
				return;
			}
		}
		this.currPolygonPoints.push(this.roundToNearest(point, this.pointThreshold));
	}

	equals(p1, p2){
		return (p1.x == p2.x) && (p1.y == p2.y);
	}

	roundToNearest(point, inc){
		var rounded = createVector(0, 0);
		rounded.x = Math.round(point.x/ inc) * inc;
		rounded.y = Math.round(point.y/ inc) * inc;
		return rounded;
	}

	drawPolygons(){
		for(var p of this.polygons){
			p.draw();
		}
	}

}