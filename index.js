/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';


function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx] == 0){
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;

        //Computer turn
        let computer_turn = computerturn(grid);
        let computerValue = 2;
        grid[computer_turn[0]][computer_turn[1]] = computerValue;

        renderMainGrid();
        addClickHandlers();
    }
}

function checkwinner(grid){
    var winner = 0;
    var new_arr = [];
    var wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    new_arr[0] = grid[0][0];
    new_arr[1] = grid[0][1];
    new_arr[2] = grid[0][2];
    new_arr[3] = grid[1][0];
    new_arr[4] = grid[1][1];
    new_arr[5] = grid[1][2];
    new_arr[6] = grid[2][0];
    new_arr[7] = grid[2][1];
    new_arr[8] = grid[2][2];

    var combinations = [];

    for(var w in wins){
        let combination = '';
        for(var pos in wins[w]){
            combination += new_arr[wins[w][pos]]
        }
        combinations.push(combination);
    }

    var z_count = 0;
    for(var z in new_arr){
        if(new_arr[z] == 0){
            z_count++;
        }
    }

    if(combinations.indexOf('111') != -1){
        winner = 'Wow, you are the winner.';
    }else if(combinations.indexOf('222') != -1){
        winner = 'Sorry, computer is the winner.';
    }else if(z_count == 1){
        winner = 'No result found.';
    }else{
        winner = null;
    }
    return winner;
}

function computerturn(grid){
    if (grid[0][0] == 0 && ((grid[0][1] == 2 && grid[0][2] == 2) || (grid[1][0] == 2 && grid[2][0] == 2) || (grid[1][1] == 2 && grid[2][2] == 2))) {
        return [0,0];
    }
    else if (grid[0][1] == 0 && ((grid[0][0] == 2 && grid[0][2] == 2) || (grid[1][1] == 2 && grid[2][1] == 2))) {
        return [0,1];
    }
    else if (grid[0][2] == 0 && ((grid[0][0] == 2 && grid[0][1] == 2) || (grid[1][2] == 2 && grid[2][2] == 2) || (grid[1][1] == 2 && grid[2][0] == 2))) {
        return [0,2];
    }
    else if (grid[1][0] == 0 && ((grid[0][0] == 2 && grid[2][0] == 2) || (grid[1][1] == 2 && grid[1][2] == 2))) {
        return [1,0];
    }
    else if (grid[1][1] == 0 && ((grid[1][0] == 2 && grid[1][2] == 2) || (grid[0][0] == 2 && grid[2][2] == 2) || (grid[0][2] == 2 && grid[2][0] == 2))) {
        return [1,1];
    }
    else if (grid[1][2] == 0 && ((grid[1][0] == 2 && grid[1][1] == 2) || (grid[0][2] == 2 && grid[2][2] == 2))) {
        return [1,2];
    }
    else if (grid[2][0] == 0 && ((grid[2][1] == 2 && grid[2][2] == 2) || (grid[0][0] == 2 && grid[1][0] == 2) || (grid[0][2] == 2 && grid[1][1] == 2))) {
        return [2,0];
    }
    else if (grid[2][1] == 0 && ((grid[2][0] == 2 && grid[2][2] == 2) || (grid[0][1] == 2 && grid[1][1] == 2))) {
        return [2,1];
    }
    else if (grid[2][2] == 0 && ((grid[2][0] == 2 && grid[2][1] == 2) || (grid[0][2] == 2 && grid[1][2] == 2) || (grid[0][0] == 2 && grid[1][1] == 2))) {
        return [2,2];
    }
    else if (grid[1][1] == 0) {
        return [1,1];
    }
    else if (grid[0][0] == 0 && (grid[0][2] == 1  || grid[2][0] == 1)) {
        return [0,0];
    }
    else if (grid[0][2] == 0 && (grid[0][0] == 1  || grid[2][2] == 1)) {
        return [0,2];
    }
    else if (grid[2][2] == 0 && (grid[0][2] == 1  || grid[2][0] == 1)) {
        return [2,2];
    }
    else if (grid[2][0] == 0 && (grid[0][0] == 1  || grid[2][2] == 1)) {
        return [2,0];
    }
    else if (grid[0][0] == 0) {
        return [0,0];
    }
    else if (grid[0][2] == 0) {
        return [0,2];
    }
    else if (grid[2][0] == 0) {
        return [2,0];
    }
    else if (grid[2][2] == 0) {
        return [2,2];
    }
    else if (grid[0][1] == 0) {
        return [0,1];
    }
    else if (grid[1][2] == 0) {
        return [1,2];
    }
    else if (grid[2][1] == 0) {
        return [2,1];
    }
    else if (grid[1][0] == 0) {
        return [1,0];
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
    winner = checkwinner(grid);
    if(winner != null){
        alert(winner);
        grid[0][0] = 0;
        grid[0][1] = 0;
        grid[0][2] = 0;
        grid[1][0] = 0;
        grid[1][1] = 0;
        grid[1][2] = 0;
        grid[2][0] = 0;
        grid[2][1] = 0;
        grid[2][2] = 0;
        renderMainGrid();
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
