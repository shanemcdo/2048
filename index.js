const grid_els = document.querySelectorAll('.grid-item');
const gameover_el = document.getElementById('game-over-popup');
const m = new Matrix(() => {
	gameover_el.style.display = 'block';
});

brightness = {
    0: 100,
    2: 90,
    4: 80,
    8: 70,
    16: 60,
    32: 50,
    64: 40,
    128: 30,
    256: 20,
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
            let el = get_grid_el(i, j);
            let val = m.values[i][j]
            el.innerHTML = val === 0 ? '' : val.toString();
            el.style.background = `hsl(275, 100%, ${brightness[val]}%)`
            if(brightness[val] <= 40)
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
