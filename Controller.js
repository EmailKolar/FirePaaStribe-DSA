import Model from './Model.js';
import View from './View.js';



export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.init(this);
        this.view.setUpButtons(this.dropBall.bind(this))
        this.view.resetButton(this.resetGame.bind(this));
        console.table(model.grid)
    }

    resetGame(){
        this.model.resetGame();
        this.view.displayBoard();
    }
    


    curPlayer = 1;
    
    nextTurn(){

        if(this.curPlayer === 1 ){
            this.curPlayer = 2;
            this.computerTurn();
        } else if (this.curPlayer===2){
            this.curPlayer=1;
            this.playerTurn();
        }

    }
    playerTurn(){

    }

    computerTurn(){

        //disable player inputs***************************

        setTimeout(() => {

        let randomNumber;
        let validCol = false;

        while(!validCol){
            randomNumber = Math.floor(Math.random()*7)
            validCol = this.model.isValidMove(randomNumber);
        }

        this.dropBall(randomNumber,this.curPlayer)
        this.view.displayBoard();
    }, 1000);
        
    }
    dropBall(col){
        console.log('BALLS');
        this.model.dropBall(col,this.curPlayer);
        this.model.dump();
        this.view.displayBoard();

        if(this.model.checkIfMatch(this.model.getTopBall(col), col,this.curPlayer)){
            if(this.curPlayer === 1 ){
                //call view YELLOW WIN
                alert('YELLOW WIN')
            }else{
                //call view RED WIN
                alert('RED WIN')
            }
        }

        this.nextTurn()
        

    }

    readFromCell(row, col){
        return this.model.readFromCell(row,col);
    }
    
    isValidMove(col){
        return this.model.isValidMove(col);
    }
}