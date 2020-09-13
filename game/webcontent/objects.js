function Tank() {
	this.limitshotdelay = 0.8;
	this.shotdelay = 0.8;
	this.acceleration = 0.3;
	this.currentspeed = 0;
	this.x = 350;
	this.y = 250;
	this.angle = 0;
	this.turretangle = 0;
	this.maxspeed = 4;
	this.minspeed = -2;
	this.friction = 0.05;
	this.image = tankimage;
	this.sight = new Image();
	this.sight.src = "game/images/sight.png";
	this.sightWidth = 116;
	this.sightHeight = 114;
	this.turretImage = new Image();
	this.turretImage.src = "game/images/turret1.png";
	this.height = 150;
	this.width = 150;
	this.turretHeight = 150;
	this.turretWidth = 150;
	this.scale = 0.6;
	this.hithoriz = 45;
	this.hitvert = 45;
	this.currentupgrade = 0;
}

Tank.prototype.updatePosition = function() {
	if (Math.abs(this.currentspeed) > 0.005)
		this.currentspeed *= (1 - this.friction);
	var xm = Math.sin(this.angle * Math.PI / 180) * this.currentspeed;
	var ym = -Math.cos(this.angle * Math.PI / 180) * this.currentspeed;
	this.x += xm;
	this.y += ym;
};

Tank.prototype.increaseSpeed = function() {
	if (this.currentspeed <= this.maxspeed) {
		this.currentspeed += this.acceleration;
	}
};

Tank.prototype.decreaseSpeed = function() {
	if (this.currentspeed >= this.minspeed) {
		this.currentspeed -= this.acceleration * 2;
	}
};

Tank.prototype.turn = function(left) {
	if (left) {
		this.angle -= 4;
		this.turretangle -= 4;
	} else {
		this.angle += 4;
		this.turretangle += 4;
	}
};

Tank.prototype.turnTurret = function(left) {
	if (left) {
		this.turretangle -= 2.5;
	} else {
		this.turretangle += 2.5;
	}
};

Tank.prototype.fireBullet = function() {
	if ((currentTime - lastShot) > this.shotdelay) {
		var bullet = new Bullet();
		bullet.currentspeed = bullet.maxspeed;
		bullet.angle = this.turretangle;
		bullet.x = this.x + (this.width / 2) - bullet.width / 2;
		bullet.y = this.y + (this.height / 2) - bullet.height / 2;
		if (tank.currentupgrade == 1)
			bullet.image = rapidimage;
		else if (tank.currentupgrade == 5)
			bullet.image = pierceimage;
		// alert(bullet.x + " " + this.x)
		var xm = Math.sin(bullet.angle * Math.PI / 180) * 40;
		var ym = -Math.cos(bullet.angle * Math.PI / 180) * 40;

		bullet.x += xm;
		bullet.y += ym;
		// alert('x = ' + bullet.x);
		bullets.push(bullet);
		playSound(shot);
		// shot.play();
		shotsfired++;
		lastShot = currentTime;
	}
};

function Enemy(type) {
	if (type == "chicken") {
		this.currentspeed = (0.6 * Math.random()) + 0.4;
		this.x = Math.floor(Math.random() * canvas.width);
		this.y = Math.floor(Math.random() * canvas.height);
		this.angle = Math.floor(Math.random() * 360);
		this.image = chickenimage;
		this.height = 180;
		this.width = 240;
		this.scale = 0.3;
		this.hithoriz = 105;
		this.hitvert = 70;
		this.cratechance = 0.05;
		this.alive = true;
		this.lives = 1;
		this.squashable = false;
		this.value = 2;
		this.deathsound = chickendeath;
	} else if (type == "chick") {
		this.currentspeed = (0.2 * Math.random()) + 0.5;
		this.x = Math.floor(Math.random() * canvas.width);
		this.y = Math.floor(Math.random() * canvas.height);
		this.angle = Math.floor(Math.random() * 360);
		this.image = chickimage;
		this.height = 177;
		this.width = 226;
		this.scale = 0.2;
		this.hithoriz = 95;
		this.hitvert = 70;
		//this.cratechance = 1;
		this.cratechance = 0.025;
		this.alive = true;
		this.lives = 1;
		this.squashable = true;
		this.value = 1;
		this.deathsound = chickdeath;
	} else if (type == "turkey") {
		this.currentspeed = (0.3 * Math.random()) + 0.35;
		this.x = Math.floor(Math.random() * canvas.width);
		this.y = Math.floor(Math.random() * canvas.height);
		this.angle = Math.floor(Math.random() * 360);
		this.image = turkeyimage;
		this.height = 177;
		this.width = 226;
		this.scale = 0.4;
		this.hithoriz = 80;
		this.hitvert = 60;
		this.cratechance = 0.06;
		this.alive = true;
		this.lives = 2;
		this.squashable = false;
		this.value = 3;
		this.deathsound = turkeydeath;
	}
}

Enemy.prototype.updatePosition = function() {
	var xm = Math.sin(this.angle * Math.PI / 180) * this.currentspeed;
	var ym = -Math.cos(this.angle * Math.PI / 180) * this.currentspeed;
	this.x += xm;
	this.y += ym;
};

Enemy.prototype.kill = function(squashed, hithutch) {
	this.lives--;
	if (this.lives == 0) {
		this.alive = false;
		var blood = new Blood(this.x + ((this.width) * this.scale), this.y
				+ ((this.height) * this.scale));
		bloodsplats.push(blood);
		playSound(this.deathsound);
		if (squashed && !hithutch) {
			playSound(squash);
			runover++;
		} else if (!hithutch)
			shotshit++;
		if (!hithutch) {
			kills++;
			if (this.value == 3)
				turkeyskilled++;
			if (this.value == 2)
				chickenskilled++;
			if (this.value == 1)
				chickskilled++;
			displayMessage(this.x + ((this.width)/2), this.y + ((this.height/2)), "+" + this.value, 1);
		}
		if (Math.random() < this.cratechance && !hithutch) {
			displayMessage(this.x + (this.width/2) - 60, this.y + (this.height/2), "Crate!", 0.8);
			var crate = new Crate(this.x + (this.width / 2) - 25, this.y
					+ (this.height / 2) - 25);
			var rand = Math.random() * 1.2;
			if (rand > 1) {
				// rapid fire
				crate.type = 1;
			} else if (rand > 0.8) {
				// run over everything
				crate.type = 2;
			} else if (rand > 0.6) {
				// bomb
				crate.type = 3;
				crate.image = bombimage;
				crate.sound = hutchdestroy;
			} else if (rand > 0.4) {
				crate.type = 4;
			} else if (rand > 0.2) {
				// pierce
				crate.type = 5;
			} else
				crate.type = 6;
			crates.push(crate);
			
		}
	} else {
		if (!squashed)
			shotshit++;
		if (this.value == 3 && this.lives == 1)
			this.image = turkeyimage1;
	}
};

// projectiles

function Bullet() {
	this.currentspeed = 0;
	this.maxspeed = 9;
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.image = bulletimage;
	this.height = 50;
	this.width = 50;
	this.scale = 0.35;
	this.hithoriz = 15;
	this.hitvert = 15;
	this.alive = true;
}

Bullet.prototype.updatePosition = function() {
	var xm = Math.sin(this.angle * Math.PI / 180) * this.currentspeed;
	var ym = -Math.cos(this.angle * Math.PI / 180) * this.currentspeed;
	this.x += xm;
	this.y += ym;
};

// fog

function Fog() {
	this.currentspeed = 0;
	this.x = -100;
	this.y = 0;
	this.image = fogimage;
	this.height = 425;
	this.width = 265;
	this.scale = 2.5;
}

// bloodsplat

function Blood(x, y) {
	this.maxlife = Math.floor(Math.random() * 200) + 150;
	this.currentlife = 0;
	this.x = x;
	this.y = y;
	this.angle = Math.floor(Math.random() * 360);
	this.scale = (Math.random() * 1) + 0.5;
	this.opacity = 1;
	this.image = bloodimage;
	this.width = 100;
	this.height = 100;
	this.alive = true;
}

// spawn points

function SpawnPoint(x, y, min, max) {
	this.x = x;
	this.y = y;
	this.minangle = min;
	this.maxangle = max;
}

SpawnPoint.prototype.spawn = function() {
	var angle = (Math.random() * (this.maxangle - this.minangle))
			+ this.minangle;
	var rand = Math.random();
	var tprob = 1 - levels[currentlevel].turkeyprob;
	var cprob = tprob - levels[currentlevel].chickenprob;
	var enemy = null;
	// alert('rand = ' + rand + " cprob = " + cprob + " tprob = " + tprob);
	if (rand > tprob) {
		enemy = new Enemy("turkey");
	} else if (rand > cprob) {
		enemy = new Enemy("chicken");
	} else {
		enemy = new Enemy("chick");
	}
	enemy.angle = angle;
	enemy.x = this.x;
	enemy.y = this.y;
	enemies.push(enemy);
	// alert(enemy.angle + " " + enemy.x + " " + enemy.y);
};

function Level(x, gap, chicken, turkey) {
	this.totalenemies = x;
	this.spawned = 0;
	this.enemiesalive = x;
	this.spawngap = gap;
	this.chickenprob = chicken;
	this.turkeyprob = turkey;

}

// crates

function Crate(x, y) {
	this.x = x;
	this.y = y;
	this.angle = Math.random() * 360;
	this.scale = 0.6;
	this.death = currentTime + 7;
	this.image = crateimage;
	this.width = 58;
	this.opacity = 1;
	this.height = 51;
	this.hithoriz = 10;
	this.hitvert = 10;
	this.alive = true;
	this.type = 1;
	this.sound = pickup;
}

Crate.prototype.collect = function() {
	cratescollected++;
	var effect = new Effect(this.x - this.width - 35, this.y - this.height - 20);
	effects.push(effect);
	this.alive = false;
	playSound(this.sound);
	removePowerUps();
	messages.length = 0;
	if (this.type == 1) {
		powerUpEnd = currentTime + 13;
		displayMessage(HALFCANVASWIDTH, 400, "UPGRADE: Rapid Fire", 14);
		tank.shotdelay = 0.2;
		tank.currentupgrade = 1;
	} else if (this.type == 2) {
		powerUpEnd = currentTime + 13;
		displayMessage(HALFCANVASWIDTH, 400, "UPGRADE: Bulldozer", 14);
		tank.currentupgrade = 2;
		tank.image = tankimage2;
	} else if (this.type == 3) {
		detonateBomb();
		bonuspoints += 10;
		displayMessage(HALFCANVASWIDTH, 400, "BOMB", 4);
	} else if (this.type == 4) {
		powerUpEnd = currentTime + 8;
		var points = (currentlevel + 1) * 5;
		displayMessage(HALFCANVASWIDTH, 400, "+" + points + " Points", 9);
		bonuspoints += points;
	} else if (this.type == 5) {
		powerUpEnd = currentTime + 10;
		displayMessage(HALFCANVASWIDTH, 400, "UPGRADE: Piercing Rounds", 11);
		tank.currentupgrade = 5;
	} else {
		powerUpEnd = currentTime + 18;
		displayMessage(HALFCANVASWIDTH, 400, "Golden Egg", 20);
		eggs.push(new Egg(45, 125, 165));
		eggs.push(new Egg(135, 560, 165));
		tank.currentupgrade = 6;
	}
};

function Egg(angle, x, y) {
	this.currentspeed = 4;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.image = eggimage;
	this.height = 120;
	this.width = 160;
	this.scale = 0.5;
	this.hithoriz = 40;
	this.hitvert = 40;
}

Egg.prototype.updatePosition = function() {
	var xm = Math.sin(this.angle * Math.PI / 180) * this.currentspeed;
	var ym = -Math.cos(this.angle * Math.PI / 180) * this.currentspeed;
	this.angle += 3;
	this.x += xm;
	this.y += ym;
};

function detonateBomb() {
	var effect = new Effect(tank.x + ((tank.width / 2) * tank.scale) - 20,
			tank.y + ((tank.height / 2) * tank.scale) - 20);
	effect.image = explosionimage;
	effects.push(effect);
	for ( var i in enemies) {
		var enemy = enemies[i];
		if (enemy.value != 3) {
			enemy.kill(true, true);
		}
	}

}

function Message(x, y, text, duration) {
	this.x = x;
	this.y = y;
	this.text = text;
	this.duration = duration;
	this.death = currentTime + duration;
}

function Effect(x, y) {
	this.maxlife = 30;
	this.currentlife = 0;
	this.x = x;
	this.y = y;
	this.angle = Math.floor(Math.random() * 360);
	this.scale = 0.2;
	this.opacity = 1;
	this.image = pickupimage;
	this.width = 259;
	this.height = 204;
	this.alive = true;
}

function Hutch() {
	this.x = 50;
	this.y = 50;
	this.angle = 270;
	this.scale = 0.7;
	this.width = 320;
	this.height = 240;
	this.image = hutch5;
	// this.image.src = hutch5;
	this.hithoriz = 136;
	this.hitvert = 80;
	this.lives = 5;
}

Hutch.prototype.loseLife = function() {
	if (this.lives > 0) {
		this.lives--;
		if (this.lives == 0)
			displayMessage(HALFCANVASWIDTH, 100, "Hutch destroyed!", 2);
		var effect = new Effect(this.x + ((this.width / 2) * this.scale) - 70,
				this.y + ((this.height / 2) * this.scale) - 70);
		effect.image = explosionimage;
		effects.push(effect);
		// score -= 30;
		playSound(hutchdestroy);
	}
	if (this.lives == 0)
		this.image = hutch0;
	if (this.lives == 1)
		this.image = hutch1;
	if (this.lives == 2)
		this.image = hutch2;
	if (this.lives == 3)
		this.image = hutch3;
	if (this.lives == 4)
		this.image = hutch4;
	if (this.lives == 5)
		this.image = hutch5;
	drawBg();
};