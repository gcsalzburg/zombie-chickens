var bg = new Image();
bg.src = "game/images/bg.jpg";
var bw = new Image();
bw.src = "game/images/newbarbed.png";

var buffer = null;
var canvas = null;

var bgcanvas = null;
var buffer2D = null;

var context2D = null;
var bgcontext = null;

var fogcontext = null;
var fogcanvas = null;

var textcontext = null;
var textcanvas = null;

var isPaused = false;

var contextbw = null;
var bwcanvas = null;

var currentKeys = new Array();
var spawnpoints = new Array();

var eggs = new Array();
var enemies = new Array();
var bullets = new Array();
var bloodsplats = new Array();
var crates = new Array();
var messages = new Array();
var effects = new Array();
var hutches = new Array();

var currentTime = 0;
var sineWave = 0;
var tank = new Tank();
var fog = new Fog();
var levels = new Array();

// stats
var currentlevel = 0;
var kills = 0;
var shotshit = 0;
var shotsfired = 0;
var runover = 0;
var cratescollected = 0;
var chickskilled = 0;
var chickenskilled = 0;
var turkeyskilled = 0;
var bonuspoints = 0;
var gamepoints = 0;
var totalpoints = 0;

var showStats = false;

//window.onload = init;

function init() {
	canvas = document.getElementById('canvas');
	context2D = canvas.getContext('2d');

	buffer = document.createElement('canvas');
	buffer.height = canvas.height;
	buffer.width = canvas.width;
	buffer2D = buffer.getContext('2d');

	bgcanvas = document.createElement('canvas');
	bgcanvas.height = canvas.height;
	bgcanvas.width = canvas.width;
	bgcontext = bgcanvas.getContext('2d');

	bwcanvas = document.createElement('canvas');
	bwcanvas.height = canvas.height;
	bwcanvas.width = canvas.width;
	contextbw = bwcanvas.getContext('2d');

	fogcanvas = document.createElement('canvas');
	fogcanvas.height = canvas.height;
	fogcanvas.width = canvas.width;
	fogcontext = fogcanvas.getContext('2d');

	textcanvas = document.createElement('canvas');
	textcanvas.height = canvas.height;
	textcanvas.width = canvas.width;
	textcontext = textcanvas.getContext('2d');

	context2D.fillText("LOADING.... PLEASE WAIT", HALFCANVASWIDTH,
			HALFCANVASHEIGHT);

	setInterval(smallGameLoop, 200);
	setInterval(gameLoop, SECONDSBETWEENFRAMES * 1000);
	setInterval(updateFramesPerSecond, 1000);
	context2D.save();
	context2D.restore();

	generateEnemies();
	drawBg();
	document.onkeydown = keyDown;
	document.onkeyup = keyUp;

}

function drawBg() {
	bgcontext.clearRect(0, 0, canvas.width, canvas.height);
	contextbw.clearRect(0, 0, canvas.width, canvas.height);
	bgcontext.drawImage(bg, 0, 0, canvas.width, canvas.height);
	contextbw.drawImage(bw, 0, 0, canvas.width, canvas.height);
	for ( var i in hutches) {
		var hutch = hutches[i];
		drawHutch(hutch);
	}

	fogcontext.save();
	fogcontext.clearRect(0, 0, canvas.width, canvas.height);
	fogcontext.translate(0, 0);
	fogcontext.scale(fog.scale, fog.scale);
	fogcontext.globalAlpha = 0.6;
	fogcontext.drawImage(fog.image, 0, 0);
	fogcontext.restore();
}

function createHutches() {
	var hutch = new Hutch();
	hutch.x = 100;
	hutch.y = 150;
	hutches.push(hutch);
	hutch = new Hutch();
	hutch.x = 450;
	hutch.y = 150;
	hutches.push(hutch);
}

function generateEnemies() {

	createHutches();

	var spawnpoint = new SpawnPoint(-140, -140, 115, 145);
	spawnpoints.push(spawnpoint);

	spawnpoint = new SpawnPoint(canvas.width, -90, 230, 255);
	spawnpoints.push(spawnpoint);

	spawnpoint = new SpawnPoint(-120, canvas.height, 25, 70);
	spawnpoints.push(spawnpoint);

	spawnpoint = new SpawnPoint(canvas.width, canvas.height, 285, 325);
	spawnpoints.push(spawnpoint);

	music.addEventListener('ended', function() {
		this.currentTime = 0;
	}, false);

	buildLevels();
	playSound(jingle);

	setTimeout('playSound(music)', 17000);

}

function buildLevels() {
	levels.push(new Level(4, 1.5, 0, 0));
	levels.push(new Level(8, 1.5, 0, 0));
	levels.push(new Level(12, 1.5, 0, 0));
	levels.push(new Level(16, 1.4, 0.1, 0));
	levels.push(new Level(20, 1, 0.2, 0));
	levels.push(new Level(24, 0.8, 0.2, 0));
	levels.push(new Level(28, 0.8, 0.3, 0));
	levels.push(new Level(32, 0.7, 0.3, 0.1));
	levels.push(new Level(36, 0.7, 0.4, 0.1));
	levels.push(new Level(40, 0.7, 0.4, 0.1));
	// lvl 10//
	levels.push(new Level(44, 0.7, 0.5, 0.1));
	levels.push(new Level(52, 0.7, 0.5, 0.2));
	levels.push(new Level(60, 0.6, 0.5, 0.2));
	levels.push(new Level(68, 0.6, 0.5, 0.2));
	levels.push(new Level(76, 0.6, 0.5, 0.25));
	levels.push(new Level(84, 0.6, 0.6, 0.25));
	levels.push(new Level(90, 0.6, 0.6, 0.25));
	levels.push(new Level(98, 0.5, 0.6, 0.3));
	levels.push(new Level(106, 0.5, 0.6, 0.3));
	levels.push(new Level(114, 0.5, 0.6, 0.3));
	// lvl 20//
	levels.push(new Level(122, 0.5, 0.6, 0.3));
	levels.push(new Level(130, 0.5, 0.6, 0.3));
	levels.push(new Level(138, 0.5, 0.6, 0.3));
	levels.push(new Level(146, 0.4, 0.6, 0.3));
	levels.push(new Level(154, 0.4, 0.6, 0.3));
	levels.push(new Level(160, 0.3, 0.6, 0.3));
	levels.push(new Level(170, 0.2, 0.6, 0.3));
	levels.push(new Level(180, 0.2, 0.6, 0.3));
	levels.push(new Level(190, 0.2, 0.6, 0.3));
	levels.push(new Level(200, 0.2, 0.6, 0.3));
	levels.push(new Level(210, 0.1, 0.6, 0.3));
	levels.push(new Level(220, 0.1, 0.6, 0.3));
	levels.push(new Level(230, 0.1, 0.6, 0.3));
	levels.push(new Level(250, 0.1, 0.6, 0.3));
	levels.push(new Level(300, 0, 0.6, 0.3));
	displayMessage(HALFCANVASWIDTH, 100, "Get Ready...Level "
			+ (currentlevel + 1), 2);

}

function keyDown(e) {
	var evtobj = window.event ? event : e; // distinguish between IE's explicit
	// event object (window.event) and
	// Firefox's implicit.
	var unicode = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
	var actualkey = String.fromCharCode(unicode);
	actualkey = actualkey.toLowerCase();
	if (actualkey == "p" && !showStats)
		isPaused = !isPaused;
	for ( var i in currentKeys) {
		if (currentKeys[i] == actualkey)
			return;
	}
	currentKeys.push(actualkey);
}

function keyUp(e) {
	var evtobj = window.event ? event : e; // distinguish between IE's explicit
	// event object (window.event) and
	// Firefox's implicit.
	var unicode = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
	var actualkey = String.fromCharCode(unicode);
	actualkey = actualkey.toLowerCase();
	for ( var i in currentKeys) {
		if (currentKeys[i] == actualkey) {
			currentKeys.splice(i, 1);
		}
	}
}

function checkKeyboard() {
	for ( var i in currentKeys) {
		var actualkey = currentKeys[i];
		if (actualkey == "w")
			tank.increaseSpeed();
		if (actualkey == "s")
			tank.decreaseSpeed();
		if (actualkey == "a")
			tank.turn(true);
		if (actualkey == "d")
			tank.turn(false);
		if (actualkey == "j")
			tank.turnTurret(true);
		if (actualkey == "l")
			tank.turnTurret(false);
		if (actualkey == "k")
			tank.fireBullet();
	}
}

function updateFramesPerSecond() {
	lastfps = fps;
	fps = 0;
}

function smallGameLoop() {
	if (!isPaused && !showStats) {
		drawPermText();
	}
}

function gameLoop() {
	fps++;
	checkKeyboard();
	if (!isPaused) {
		if (showStats)
			drawStats();
		else {
			updateObjects();
			drawObjects();
		}
	} else {
		drawPause();
	}
}

function updateObjects() {
	tank.updatePosition();
	updateSineWave();
	updateEnemies();
	updateBullets();
	updateFog();
	updateBlood();
	updateEffects();
	updateCrates();
	updatePowerUps();
	checkCollisions();
	checkLimits();
	checkPlayerBounds();
	updateText();
	pruneArrays();
	updateSpawns();
}

function updateText() {
	for ( var i in messages) {
		var msg = messages[i];
		if (msg.death <= currentTime) {
			messages.splice(i, 1);
		}
	}
}

function displayMessage(x, y, text, duration) {
	var msg = new Message(x, y, text, duration);
	messages.push(msg);
}

function removePowerUps() {
	if (tank.currentupgrade == 1) {
		tank.shotdelay = tank.limitshotdelay;
	}
	if (tank.currentupgrade == 2) {
		tank.image = tankimage;
	}
	eggs.length = 0;
	tank.currentupgrade = 0;
}

function updatePowerUps() {
	if (currentTime >= powerUpEnd && tank.currentupgrade != 0) {
		removePowerUps();
	}
}

function updateSpawns() {

	if (Math.random() > 0.999)
		playSound(thunder);

	if (hutches[0].lives == 0 && hutches[1].lives == 0 && gameEndTime == 0)
		gameEndTime = currentTime + 1.5;

	if (hutches[0].lives == 0 && hutches[1].lives == 0
			&& gameEndTime < currentTime)
		gameEnd("Hutches Destroyed - Game Over!");

	if (levels[currentlevel].enemiesalive == 0) {
		currentlevel++;
		if (currentlevel == levels.length)
			gameEnd("End of Demo - More levels and features coming soon!");
		var lev = currentlevel + 1;
		levelUp(lev);
		displayMessage(HALFCANVASWIDTH, 100, "Level " + lev, leveldelay + 2);
		var hutchlives = 0;
		for ( var i in hutches)
			hutchlives += hutches[i].lives;

		var hip = hutchlives * currentlevel;
		bonuspoints += hip;
		displayMessage(HALFCANVASWIDTH, 150, "+" + hip + " Hutch Life Points",
				leveldelay);
		if (lev % 5 == 0) {
			tank.limitshotdelay -= 0.05;
			tank.shotdelay = tank.limitshotdelay;
			displayMessage(HALFCANVASWIDTH, 350, "Cannon Upgrade", leveldelay - 1);
		}

		nextLevel = currentTime + leveldelay;
	} else if (nextLevel < currentTime
			&& (currentTime - lastSpawn) > levels[currentlevel].spawngap
			&& levels[currentlevel].spawned < levels[currentlevel].totalenemies) {
		var spawnid = Math.floor(Math.random() * 4);
		spawnpoints[spawnid].spawn();
		lastSpawn = currentTime;
		levels[currentlevel].spawned++;
	}

}

function updateBlood() {
	for ( var i in bloodsplats) {
		var blood = bloodsplats[i];
		blood.currentlife++;
		blood.opacity = 1 - (blood.currentlife / blood.maxlife);
		if (blood.currentlife >= blood.maxlife) {
			blood.alive = false;
		}
	}
}

function updateEffects() {
	for ( var i in effects) {

		var effect = effects[i];
		effect.currentlife++;
		effect.opacity = 1 - (effect.currentlife / effect.maxlife);
		effect.scale = effect.currentlife / (effect.maxlife / 2);
		if (effect.currentlife >= effect.maxlife) {
			effect.alive = false;
		}
	}
}

function updateBullets() {
	for ( var i in eggs) {
		var egg = eggs[i];
		egg.updatePosition();
	}
	for ( var i in bullets) {
		var bullet = bullets[i];
		bullet.updatePosition();
	}
}

function updateEnemies() {
	for ( var i = 0; i < enemies.length; i++) {
		var enemy = enemies[i];
		enemy.updatePosition();
	}
}

function updateCrates() {
	for ( var i in crates) {
		var crate = crates[i];
		crate.opacity = (crate.death - currentTime) / 5;
		// alert(crate.death + " " + currentTime);
		if (crate.death <= currentTime)
			crate.alive = false;
	}
}

function checkCollisions() {
	for ( var i in enemies) {
		var enemy = enemies[i];
		if (enemy.squashable || tank.currentupgrade == 2) {
			if (checkIntersect(tank, enemy)) {
				enemy.kill(true, false);

			}
		}
		for ( var j in bullets) {
			var bullet = bullets[j];
			if (checkIntersect(bullet, enemy)) {
				if (tank.currentupgrade != 5)
					bullet.alive = false;
				enemy.kill(false, false);
			}
		}

		for ( var j in eggs) {
			var bullet = eggs[j];
			if (checkIntersect(bullet, enemy)) {
				enemy.kill(false, true);
			}
		}
		for ( var i in hutches) {
			var hutch = hutches[i];
			if (hutch.lives > 0) {
				if (checkIntersect(hutch, enemy)) {
					hutch.loseLife();
					if (hutch.lives >= 0)
						enemy.kill(true, true);
				}
			}
		}
	}
	for ( var i in crates) {

		var crate = crates[i];
		if (checkIntersect(tank, crate)) {
			crate.collect();
		}
	}
}

function pruneArrays() {
	for ( var i in enemies) {
		var enemy = enemies[i];
		if (!enemy.alive) {
			enemies.splice(i, 1);
			levels[currentlevel].enemiesalive--;
		}
	}

	for ( var j in bullets) {
		var bullet = bullets[j];
		if (!bullet.alive)
			bullets.splice(j, 1);
	}
	for ( var i in bloodsplats) {
		var blood = bloodsplats[i];
		if (!blood.alive)
			bloodsplats.splice(i, 1);
	}
	for ( var i in crates) {
		var crate = crates[i];
		if (!crate.alive)
			crates.splice(i, 1);
	}

	for ( var i in effects) {
		var effect = effects[i];
		if (!effect.alive)
			effects.splice(i, 1);
	}
}

function checkLimits() {
	for ( var i in enemies) {
		var enemy = enemies[i];
		checkBounds(enemy);
	}
	for ( var j in bullets) {
		var bullet = bullets[j];
		checkBounds(bullet);
	}

}

function checkBounds(object) {
	if ((object.x + (object.scale * object.width)) > (canvas.width) + 200
			|| object.x < -200
			|| object.y < -200
			|| (object.y + (object.scale * object.height)) > (canvas.height + 200)) {
		object.alive = false;
		// levels[currentlevel].enemiesalive--;
		// alert('object out of bounds at ' + object.x + " " + object.y);
	}
}

function checkPlayerBounds() {

	// right
	if (tank.x + (tank.width * tank.scale) > canvas.width - 80) {
		tank.x -= 2;
		tank.currentspeed = -1;
	}

	// left
	if (tank.x < 10) {
		tank.x += 2;
		tank.currentspeed = -1;
	}

	// top
	if (tank.y < 0) {
		tank.y += 2;
		tank.currentspeed = -1;
	}

	// bottom
	if (tank.y + (tank.height * tank.scale) > canvas.height - 70) {
		tank.y -= 2;
		tank.currentspeed = -1;
	}

}

function updateSineWave() {
	currentTime += SECONDSBETWEENFRAMES;
	sineWave = (Math.sin(currentTime) + 1) / 2;

}

function updateFog() {
	if (fogcounter > currentTime) {
		fog.x += fogmove;
	} else {
		fogcounter = currentTime + 30;
		fogmove *= -1;
	}

}

function drawBullet(bullet) {

	buffer2D.save();
	buffer2D.translate(bullet.x + (bullet.width / 2), bullet.y
			+ (bullet.height / 2));

	buffer2D.rotate(bullet.angle * Math.PI / 180);

	buffer2D.scale(bullet.scale, bullet.scale);
	buffer2D.drawImage(bullet.image, -bullet.width / 2, -bullet.height / 2);
	buffer2D.restore();

	buffer2D.save();

	// A1 = getHitboxPoint(0, bullet).x;
	// C1 = getHitboxPoint(0, bullet).y;
	//	
	// B1 = getHitboxPoint(3, bullet).x;
	// D1 = getHitboxPoint(3, bullet).y;
	//
	// buffer2D.strokeRect(A1, C1, B1 - A1, D1 - C1);

	buffer2D.restore();

}

function drawEnemy(chicken) {
	buffer2D.save();
	buffer2D.translate(chicken.x + (chicken.width / 2), chicken.y
			+ (chicken.height / 2));

	buffer2D.rotate((chicken.angle % 180) * Math.PI / 180);

	if (chicken.angle < 180)
		buffer2D.scale(-1, 1);
	else
		buffer2D.scale(-1, -1);

	buffer2D.scale(chicken.scale, chicken.scale);
	buffer2D.drawImage(chicken.image, -chicken.width / 2, -chicken.height / 2);
	buffer2D.restore();

	buffer2D.save();

	// A1 = getHitboxPoint(0, chicken).x;
	// C1 = getHitboxPoint(0, chicken).y;
	//
	// B1 = getHitboxPoint(3, chicken).x;
	// D1 = getHitboxPoint(3, chicken).y;

	// buffer2D.strokeRect(A1, C1, B1 - A1, D1 - C1);

	buffer2D.restore();
}

function drawTank() {
	// draw tank

	buffer2D.translate(tank.x + (tank.width / 2), tank.y + (tank.height / 2));
	buffer2D.rotate(tank.angle * Math.PI / 180);
	buffer2D.scale(tank.scale, tank.scale);
	buffer2D.drawImage(tank.image, -tank.width / 2, -tank.height / 2);
	buffer2D.rotate(-tank.angle * Math.PI / 180);
	buffer2D.rotate(tank.turretangle * Math.PI / 180);
	buffer2D.drawImage(tank.turretImage, -tank.turretWidth / 2,
			-tank.turretHeight / 2);
	buffer2D.translate(0, -200);
	buffer2D.scale(0.5, 0.5);
	buffer2D.drawImage(tank.sight, -tank.sightWidth / 2, -tank.sightHeight / 2);
	buffer2D.restore();

	buffer2D.save();

	// A1 = getHitboxPoint(0, tank).x;
	// C1 = getHitboxPoint(0, tank).y;
	//
	// B1 = getHitboxPoint(3, tank).x;
	// D1 = getHitboxPoint(3, tank).y;

	// buffer2D.strokeRect(A1, C1, B1 - A1, D1 - C1);

	buffer2D.restore();
}

function drawBlood(blood) {
	buffer2D.save();

	buffer2D.translate(blood.x + (blood.width / 2), blood.y
			+ (blood.height / 2));
	buffer2D.rotate(blood.angle * Math.PI / 180);
	buffer2D.scale(blood.scale, blood.scale);
	buffer2D.globalAlpha = blood.opacity;
	buffer2D.drawImage(blood.image, Math.round(-blood.width / 2), Math
			.round(-blood.height / 2));

	buffer2D.restore();
}

function drawCrate(crate) {
	buffer2D.save();

	buffer2D.translate(crate.x + (crate.width / 2), crate.y
			+ (crate.height / 2));
	crate.angle++;
	buffer2D.rotate(crate.angle * Math.PI / 180);
	buffer2D.scale(crate.scale, crate.scale);
	buffer2D.globalAlpha = crate.opacity;
	buffer2D.drawImage(crate.image, Math.round(-crate.width / 2), Math
			.round(-crate.height / 2));

	buffer2D.restore();

	buffer2D.save();

	// A1 = getHitboxPoint(0, crate).x;
	// C1 = getHitboxPoint(0, crate).y;
	//	
	// B1 = getHitboxPoint(3, crate).x;
	// D1 = getHitboxPoint(3, crate).y;
	//	
	// buffer2D.strokeRect(A1, C1, B1 - A1, D1 - C1);

	buffer2D.restore();
}

function drawHutch(crate) {
	bgcontext.save();

	bgcontext.translate(crate.x + (crate.width / 2), crate.y
			+ (crate.height / 2));
	bgcontext.rotate(crate.angle * Math.PI / 180);
	bgcontext.scale(crate.scale, crate.scale);
	bgcontext.drawImage(crate.image, Math.round(-crate.width / 2), Math
			.round(-crate.height / 2));

	bgcontext.restore();

	bgcontext.save();
	//
	// // A1 = getHitboxPoint(0, crate).x;
	// // C1 = getHitboxPoint(0, crate).y;
	// //
	// // B1 = getHitboxPoint(3, crate).x;
	// // D1 = getHitboxPoint(3, crate).y;
	//
	// // buffer2D.strokeRect(A1, C1, B1 - A1, D1 - C1);
	//
	bgcontext.restore();
}

function drawText(text) {
	buffer2D.save();
	buffer2D.fillStyle = "#fff";
	buffer2D.textBaseline = "top";
	buffer2D.textAlign = "center";
	buffer2D.font = "bold 24px monospace";
	// alert((text.death - currentTime) / text.duration);
	buffer2D.globalAlpha = (text.death - currentTime) / text.duration;
	buffer2D.fillText(text.text, text.x, text.y);
	buffer2D.restore();
}

function getInGameScore() {
	var turkeys = turkeyskilled * 3;
	var chickens = chickenskilled * 2;
	var chicks = chickskilled;
	return (turkeys + chickens + chicks + bonuspoints);
}

function drawPermText() {
	textcontext.save();
	textcontext.clearRect(0, 0, canvas.width, canvas.height);
	textcontext.fillStyle = "#fff";
	textcontext.globalAlpha = 0.5;
	textcontext.textBaseline = "top";
	textcontext.textAlign = "center";
	textcontext.font = "bold 24px monospace";
	textcontext.fillText("Kills: " + kills, HALFCANVASWIDTH, 200);
	textcontext.fillText("Score: " + getInGameScore(), HALFCANVASWIDTH, 225);
	var leve = currentlevel + 1;
	textcontext.fillText("Level: " + leve, HALFCANVASWIDTH, 250);
	var acc = Math.floor((shotshit / Math.max(1, shotsfired)) * 100);
	textcontext.fillText("Accuracy: " + acc + "%", HALFCANVASWIDTH, 275);

	if ((currentTime - lastShot) > tank.shotdelay) {
		textcontext.fillStyle = "#1f1";
	} else {
		textcontext.fillStyle = "#f11";
	}
	textcontext.beginPath();
	textcontext.arc(160, 465, 9, 0, 2 * Math.PI, false);
	textcontext.closePath();
	textcontext.fill();
	textcontext.lineWidth = 4;
	textcontext.strokeStyle = "#000";
	textcontext.stroke();
	textcontext.fillStyle = "#fff";
	textcontext.fillText("Cannon:", 100, 450);
	for ( var i in hutches) {
		var hutch = hutches[i];
		if (hutch.lives > 1) {
			textcontext.fillText(hutch.lives + " lives", hutch.x + 155,
					hutch.y + 180);
		} else if (hutch.lives == 1) {
			textcontext.fillText(hutch.lives + " life", hutch.x + 155,
					hutch.y + 180);
		}
	}
	if (BETA) {
		textcontext.font = "bold 12px monospace";
		textcontext.fillText("FPS: " + lastfps, 80, 60);
		textcontext.fillText("v " + VERSION, 760, 60);
		textcontext.fillText("Press [p] to pause", 730, 460);
	}
	textcontext.restore();
}

function drawFade() {
	buffer2D.save();
	buffer2D.globalAlpha = Math.max((0.7 - Math.abs((leveldelay / 2)
			- (nextLevel - currentTime))
			/ (leveldelay / 2)), 0);
	buffer2D.fillStyle = "#511";
	buffer2D.fillRect(0, 0, canvas.width, canvas.height);
	buffer2D.restore();
}

function drawObjects() {
	// draw bg from bg canvas
	context2D.clearRect(0, 0, canvas.width, canvas.height);
	context2D.drawImage(bgcanvas, 0, 0);
	// draw rectangle
	buffer2D.clearRect(0, 0, canvas.width, canvas.height);
	buffer2D.drawImage(textcanvas, 0, 0);
	// drawPermText();

	buffer2D.save();

	for ( var i in bloodsplats) {
		var blood = bloodsplats[i];
		drawBlood(blood);
	}

	// for ( var i in hutches) {
	// var hutch = hutches[i];
	// drawHutch(hutch);
	// }

	for ( var i in enemies) {
		var chicken = enemies[i];
		drawEnemy(chicken);
	}

	for ( var i in crates) {
		var crate = crates[i];
		drawCrate(crate);
	}

	for ( var i in bullets) {
		var bullet = bullets[i];
		drawBullet(bullet);
	}

	for ( var i in effects) {
		var blood = effects[i];
		drawBlood(blood);
	}

	drawTank();

	for ( var i in eggs) {
		var egg = eggs[i];
		drawBullet(egg);
	}

	buffer2D.drawImage(bwcanvas, 0, 0);

	buffer2D.drawImage(fogcanvas, 0, 0);

	if (currentTime < nextLevel)
		drawFade();
	for ( var i in messages) {
		var text = messages[i];
		drawText(text);
	}

	// copy buffer to display
	context2D.drawImage(buffer, 0, 0);
}

function drawStatBg() {
	buffer2D.save();
	buffer2D.translate(60, 360);
	buffer2D.rotate(270 * (Math.PI / 180));
	buffer2D.drawImage(chickenimage, 0, 0);
	buffer2D.restore();
	buffer2D.save();
	buffer2D.translate(550, 450);
	buffer2D.rotate(270 * (Math.PI / 180));
	buffer2D.scale(2, 2);
	buffer2D.drawImage(turkeyimage, 0, 0);
	buffer2D.restore();
}

function drawPause() {
	context2D.drawImage(bgcanvas, 0, 0);
	buffer2D.clearRect(0, 0, canvas.width, canvas.height);
	drawStatBg();
	buffer2D.fillStyle = "#fff";
	buffer2D.textBaseline = "top";
	buffer2D.textAlign = "center";
	buffer2D.font = "bold 24px monospace";
	buffer2D.fillText("Game Paused", HALFCANVASWIDTH, 150);
	buffer2D.fillText("Press [P] to resume", HALFCANVASWIDTH, 200);
	context2D.drawImage(buffer, 0, 0);
}

function drawStats() {
	// draw bg from bg canvas
	context2D.drawImage(bgcanvas, 0, 0);
	// draw rectangle
	buffer2D.clearRect(0, 0, canvas.width, canvas.height);
	drawStatBg();
	buffer2D.fillStyle = "#fff";
	buffer2D.textBaseline = "top";
	buffer2D.textAlign = "center";
	buffer2D.font = "bold 24px monospace";
	var level = currentlevel + 1;
	buffer2D.fillText("Game Over (Level " + level + ")", HALFCANVASWIDTH, 100);
	buffer2D.fillText("Kills: " + kills, HALFCANVASWIDTH, 150);
	buffer2D.textAlign = "right";
	buffer2D.fillText("Chicks Killed: 1 x " + chickskilled + " = "
			+ chickskilled, HALFCANVASWIDTH + 160, 175);
	buffer2D.fillText("Chickens Killed: 2 x " + chickenskilled + " = "
			+ (chickenskilled * 2), HALFCANVASWIDTH + 160, 200);
	buffer2D.fillText("Turkeys Killed: 3 x " + turkeyskilled + " = "
			+ (turkeyskilled * 3), HALFCANVASWIDTH + 160, 225);
	buffer2D.textAlign = "center";
	buffer2D.fillText("Bonus/Crate Points: " + bonuspoints, HALFCANVASWIDTH,
			250);
	buffer2D.fillText("Game Score: " + gamepoints, HALFCANVASWIDTH, 275);
	var acc = Math.floor((shotshit / Math.max(1, shotsfired)) * 100);
	var multiplier = (acc / 100) / 5;
	multiplier = Math.round(multiplier * 100) / 100;
	var accbonus = multiplier * gamepoints;
	accbonus = Math.round(accbonus);
	buffer2D.fillText("Accuracy Bonus: " + acc + "% = " + multiplier + " x "
			+ gamepoints + " = " + accbonus, HALFCANVASWIDTH, 325);
	totalpoints = gamepoints + accbonus;
	buffer2D.fillText("Total Score: " + totalpoints, HALFCANVASWIDTH, 375);
	buffer2D.save();
	buffer2D.drawImage(fogcanvas, 0, 0);
	buffer2D.restore();

	// copy buffer to display
	context2D.drawImage(buffer, 0, 0);
}