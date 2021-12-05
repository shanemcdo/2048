const grid_els = document.querySelectorAll('.grid-item');
const m = new Matrix();

function get_grid_el(i, j){
    return grid_els[i * MATSIZE + j];
}

function update_grid(){
    for(let i = 0; i < MATSIZE; i++){
        for(let j = 0; j < MATSIZE; j++){
            get_grid_el(i, j).innerHTML = m.values[i][j] === 0 ? '' : m.values[i][j].toString();
        }
    }
}

update_grid();

document.addEventListener('keydown', event=>{
    console.log(event);
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
    }
    m.insert_random();
    update_grid();
});
