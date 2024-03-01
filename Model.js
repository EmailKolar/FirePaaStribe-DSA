export default class Model {
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
        
    }
    dump(){
        console.table(this.grid);
    }
    resetGame(){
        this.grid = Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => 0));
    }

    writeToCell(row, col, value) {
        if (this.isValidCell(row, col)) {
            this.grid[row][col] = value;
        } else {
            console.error('Invalid cell');
        }
    }

    readFromCell(row, col) {
        if (this.isValidCell(row, col)) {
            return this.grid[row][col];
        } else {
            console.error('Invalid cell');
            return null;
        }
    }

    isValidCell(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    checkIfMatch(row,col,curPlayer){
        //console.log('HORI MATCH?: '+this.checkHorizontal(row,curPlayer));
        //console.log('verti match: '+this.checkVertical(col,curPlayer));
        //console.log('diag match: '+this.checkDiagonals(curPlayer));

        if(this.checkHorizontal(row,curPlayer)||this.checkVertical(col,curPlayer)
        ||this.checkDiagonals(curPlayer)){
    return true;
    }else{
        return false;
    }
        
    }

    checkHorizontal(row,curPlayer){
        for (let i = 0; i <= this.cols - 4; i++) {
            let match = true;
            for (let j = 0; j < 4; j++) {
                if (this.grid[row][i + j] !== curPlayer) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return true; 
            }
        }
        return false; 
    }
    checkVertical(col,curPlayer){
        for (let i = 0; i <= this.rows-4; i++) {
            let match = true;
            for (let j = 0; j < 4; j++) {
                if(i + j >= this.rows || this.grid[i + j][col] !== curPlayer){
                    match = false;
                    break;
                }
            }
            if(match){
                return true;
            }
            
        }
        return false;
    }

    checkDiagonals(curPlayer) {
        const rows = this.grid.length;
        const cols = this.grid[0].length;
    
        for (let r = 0; r <= rows - 4; r++) {
            for (let c = 0; c <= cols - 4; c++) {
                if (this.grid[r][c] == curPlayer && 
                    this.grid[r + 1][c + 1] == curPlayer &&
                    this.grid[r + 2][c + 2] == curPlayer &&
                    this.grid[r + 3][c + 3] == curPlayer) {
                    return true;
                }
            }
        }
        return false;
    }


    isValidMove(col) {
        //returns only true if col not full
        return this.grid[0][col] === 0;
    }

    dropBall(col, player){
        //algo to sink down correctly
        if(col > this.cols || col<0){
            console.log('err');
            return false;
        }
        
        for (let i = 0; i < this.rows; i++) {
            if(this.grid[i][col] != 0 && i>0){
                this.grid[i-1][col] = player;
                return true;
            }
        }
        if(this.grid[5][col] == 0){//tom kolonne
            this.grid[5][col] = player;
            return true;
        }


    }

    getTopBall(col){
        for (let i = 0; i < this.rows; i++) {
            if(this.grid[i][col]!=0){
                return i;
            }
            
        }
    }

}



