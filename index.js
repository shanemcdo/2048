const grid_els = document.querySelectorAll('.grid-item');
const gameover_el = document.getElementById('game-over-popup');
const m = new Matrix(() => {
	gameover_el.style.display = 'block';
});

brightness = {
	0: 100,
	2: 80,
	4: 60,
	8: 50,
	16: 40,
	32: 30,
	64: 25,
	128: 20,
	256: 15,
	512: 10,
	1024: 5,
	2048: 0,
}

function get_grid_el(i, j){
	return grid_els[i * MATSIZE + j];
}

function update_grid(){
	for(let i = 0; i < MATSIZE; i++){
		for(let j = 0; j < MATSIZE; j++){
			const el = get_grid_el(i, j);
			const val = m.values[i][j]
			const brightness_val = brightness[val] ?? 0;
			el.innerHTML = val === 0 ? '' : val.toString();
			el.style.background = `hsl(275, 100%, ${brightness_val}%)`
			if(brightness_val <= 40)
				el.style.color = 'white';
			else
				el.style.color = '';
		}
	}
}

function reset_game(){
	gameover_el.style.display = '';
	m.reset();
	update_grid();
}

update_grid();

document.addEventListener('keydown', event=>{
	switch(event.key){
		case 'A':
		case 'a':
		case 'ArrowLeft':
			m.move(Direction.Left);
			break;
		case 'S':
		case 's':
		case 'ArrowDown':
			m.move(Direction.Down);
			break;
		case 'D':
		case 'd':
		case 'ArrowRight':
			m.move(Direction.Right);
			break;
		case 'W':
		case 'w':
		case 'ArrowUp':
			m.move(Direction.Up);
			break;
		default:
			return;
	}
	m.insert_random();
	update_grid();
});
