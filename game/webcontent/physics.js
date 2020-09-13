function checkIntersect(object1, object2) {
	
	if ((getDistance(object1, object2)) > 200)
		 return false;
	
	var tl1 = getHitboxPoint(0, object1);
	var tl2 = getHitboxPoint(0, object2);
	
	var br1 = getHitboxPoint(3, object1);
	var br2 = getHitboxPoint(3, object2);
	
	
	if (isPointInRect(tl2, tl1, br1) || isPointInRect(new Point(tl2.x, br2.y), tl1, br1) || 
			isPointInRect(new Point(br2.x, tl2.y), tl1, br1) || isPointInRect(br2, tl1, br1)){
		return true;
	}
	
	if (isPointInRect(tl1, tl2, br2))
		return true;
	
	return false;
}

function getDistance(object1, object2) {
	var point1 = new Point();
	point1.x = object1.x + (object1.width / 2);
	point1.y = object1.y + (object1.height / 2);
	var point2 = new Point();
	point2.x = object2.x + (object2.width / 2);
	point2.y = object2.y + (object2.height / 2);

	var dx = Math.abs(Math.floor(point1.x) - Math.floor(point2.x));
	var dy = Math.abs(Math.floor(point1.y) - Math.floor(point2.y));

	return (Math.sqrt((dx * dx) + (dy * dy)));
}

function getHitboxPoint(id, object) {
	// if = 0,1,2,3
	// / 0 ----- 1
	// / | ----- |
	// / | ----- |
	// / 2 ----- 3
	var result = new Point(0, 0);

	if (id == 0) {
		result.x = object.x + object.hithoriz;
		result.y = object.y + object.hitvert;
	} else if (id == 1) {
		result.x = object.x + object.width - object.hithoriz;
		result.y = object.y + object.hitvert;
	} else if (id == 2) {
		result.x = object.x + object.hithoriz;
		result.y = object.y + object.height - object.hitvert;
	} else {
		result.x = object.x + object.width - object.hithoriz;
		result.y = object.y + object.height - object.hitvert;
	}
	return result;
}

function isPointInRect(point, recttl, rectbr) {
	if (recttl.x < point.x && point.x < rectbr.x && recttl.y < point.y
			&& point.y < rectbr.y) {
		return true;
	} else {
		return false;
	}
}