let hero = {
	x: 900,
	y: 450,
	holder: document.getElementById("hero"),
	alive: true
}

let step = 50;

function move(unit, direction) {
	if (unit.alive)
		switch (direction) {
			case "right":
				if (unit.x <= 1350) {
					unit.x += step;
					if (unit.holder)
						unit.holder.style.left = unit.x + "px";
				}
				break;
			case "left":
				if (unit.x >= 450) {
					unit.x -= step;
					if (unit.holder)
						unit.holder.style.left = unit.x + "px";

				}
				break;
			case "up":
				if (unit.y >= 50) {
					unit.y -= step;
					if (unit.holder)
						unit.holder.style.top = unit.y + "px";
				}
				break;
			case "down":
				if (unit.y <= 850) {
					unit.y += step;
					if (holder)
						unit.holder.style.top = unit.y + "px";
				}
				break;
		}
}
  module.exports = move;

document.onkeypress = function (event) {
	switch (event.code) {
		case "KeyD":
			move(hero, "right");
			break;
		case "KeyA":
			move(hero, "left");
			break;
		case "KeyW":
			move(hero, "up");
			break;
		case "KeyS":
			move(hero, "down");
			break;
		case "KeyL":
			punch("right");
			break;
		case "KeyJ":
			punch("left");
			break;
		case "KeyI":
			punch("up");
			break;
		case "KeyK":
			punch("down");
			break;
	}
}

function behave(unit) {
	if (unit.alive) {
		if (unit.x > hero.x)
			move(unit, "left");
		else if (unit.x < hero.x)
			move(unit, "right");
		if (unit.y > hero.y)
			move(unit, "up");
		else if (unit.y < hero.y)
			move(unit, "down");

		if (unit.x == hero.x && unit.y == hero.y)
			dead(hero);
	}
}

function punch(direction) {
	let x, y;
	switch (direction) {
		case "right":
			x = hero.x + 50;
			y = hero.y;
			break;
		case "left":
			x = hero.x - 50;
			y = hero.y;
			break;
		case "up":
			x = hero.x;
			y = hero.y - 50;
			break;
		case "down":
			x = hero.x;
			y = hero.y + 50;
			break;
		default:
			x, y = 0;
	}
	let sword = document.createElement("div");
	sword.setAttribute("id", "sword");
	sword.setAttribute("class", "sword");
	sword.setAttribute("style", `left: ${x}px; top: ${y}px;`);
	document.getElementById("map").appendChild(sword);
	setTimeout(() => {
		document.getElementById("sword").remove();
	}, 300);
	for (let enemy of enemies)
		if (enemy.x == x && enemy.y == y)
			dead(enemy);
}

function dead(unit) {
	unit.alive = false;
	if (unit.holder)
		unit.holder.remove();
	if (unit == hero) {
		clearInterval(spawn);
		clearInterval(behavior);
		let kills = 0;
		for (let enemy of enemies)
			if (!enemy.alive) kills++;
		alert(`You have killed ${kills} enemies`);
	}
}

let enemies = [];

let spawn = setInterval(() => {
	let enemy = document.createElement('div');
	enemy.setAttribute("id", `enemy${enemies.length}`);
	enemy.setAttribute("class", "enemy");
	document.getElementById("map").appendChild(enemy);
	if (enemies.length % 2 == 0)
		enemies.push({
			x: Math.floor(Math.floor(Math.random() * (1750 - 1450 + 1) + 1450) / 50) * 50,
			y: Math.floor(Math.floor(Math.random() * (950 - 0 + 1) + 0) / 50) * 50,
			holder: document.getElementById(`enemy${enemies.length}`),
			alive: true
		});
	else
		enemies.push({
			x: Math.floor(Math.floor(Math.random() * (450 - 50 + 1) + 50) / 50) * 50,
			y: Math.floor(Math.floor(Math.random() * (950 - 0 + 1) + 0) / 50) * 50,
			holder: document.getElementById(`enemy${enemies.length}`),
			alive: true
		});
}, 2000);

let behavior = setInterval(() => {
	for (let enemy of enemies)
		behave(enemy);
}, 1000);