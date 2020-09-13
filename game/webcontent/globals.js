// target frames per second
const FPS = 40;
const BETA = true;
const SECONDSBETWEENFRAMES = 1 / FPS;
const HALFCANVASWIDTH = 425;
const HALFCANVASHEIGHT = 265;
const VERSION = "1.110513";

var audioState = true;

var fps = 0;
var lastfps = 0;

var lastShot = 0;
var lastSpawn = 0;
var nextLevel = 2.5;
var leveldelay = 5;
var fogcounter = 30;
var fogmove = 0.005;
var gameEndTime = 0;
var powerUpEnd = 0;

function gameEnd(parameter){
	gamepoints = getInGameScore();
	
	var acc = Math.floor((shotshit / Math.max(1, shotsfired)) * 100);
	var multiplier = (acc / 100) / 5;
	multiplier = Math.round(multiplier * 100) / 100;
	var accbonus = multiplier * gamepoints;
	accbonus = Math.round(accbonus);
	
	totalpoints = accbonus + gamepoints;
	
	//alert("totalpoints = " + totalpoints + " gamepoints = " + gamepoints);
	showStats = true;
	$("#score").text(totalpoints);
	$("#save_highscore").fadeIn();
}

function restartGame(){
	showStats = false;
	//alert('restarting game');
	currentlevel = 0;
	kills = 0;
	shotshit = 0;
	shotsfired = 0;
	runover = 0;
	cratescollected = 0;
	chickskilled = 0;
	chickenskilled = 0;
	turkeyskilled = 0;
	bonuspoints = 0;
	gamepoints = 0;
	totalpoints = 0;
	isPaused = false;
	
	currentTime = 0;
	lastShot = 0;
	lastSpawn = 0;
	nextLevel = 2.5;
	leveldelay = 5;
	fogcounter = 30;
	fogmove = 0.2;
	gameEndTime = 0;
	powerUpEnd = 0;

	
	tank = new Tank();
	
	hutches.length = 0;
	enemies.length = 0;
	crates.length = 0;
	bullets.length = 0;
	bloodsplats.length = 0;
	messages.length = 0;
	effects.length = 0;
	levels.length = 0;
	eggs.length = 0;

	buildLevels();
	createHutches();
	drawBg();
	//displayMessage(HALFCANVASWIDTH, 100, "END OF DEMO... RESTARTING " + lev, leveldelay + 10);
}

function levelUp(nextlevelnumber){
	//alert('about to start level ' + nextlevelnumber);
}


