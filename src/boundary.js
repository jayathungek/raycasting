class Boundary{
	constructor(start, end){
		this.start = start;
		this.end = end;
		this.collisionPoints = [];
		this.segments = [];
	}


	getIlluminatedSegments(){
		var segments = [];
		for (let i = 0; i< this.collisionPoints.length; i++){
			
			if(i == 0){
				segments.push(this.collisionPoints[i]);

			}else if(i > 0){
				if(i == (this.collisionPoints.length-1)){
					if(this.collisionPoints[i] != null){
						segments.push(this.collisionPoints[i]);
					}else{
						segments.push(this.collisionPoints[i-1]);
					}
				}else{
					if(this.collisionPoints[i] == null){
						segments.push(this.collisionPoints[i-1]);
						segments.push(this.collisionPoints[i+1]);
					}
				}

			}

		}
		this.segments = segments;
	}

	isHorizontal(){
		return this.start.y == this.end.y;
	}

	isVertical(){
		return this.start.x == this.end.x;
	}

	drawFancy(){
		stroke(255);
		this.getIlluminatedSegments();
		if((this.segments.length % 2) == 0){
			for(let i = 0; i< this.segments.length; i+=2){
				line(this.segments[i].x, this.segments[i].y, 
					 this.segments[i+1].x, this.segments[i+1].y);
			}
			

		}
		
	}
	
	draw(){
		stroke(255);
		line(this.start.x, this.start.y, this.end.x, this.end.y);
		
	}
}