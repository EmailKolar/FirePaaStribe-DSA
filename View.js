

export default class View{

    init(controller){
        window.addEventListener("load",this.start());
        this.controller = controller;
    }

    
    start(){
        console.log('Javascript running');

    }

    resetButton(resetGame){
        document.querySelector("#resetBtn").addEventListener("click",()=>{
            resetGame();
        })
    }


    setUpButtons(dropBall){
        const btns = document.querySelectorAll(".btn")
        btns.forEach(btn =>{
            btn.addEventListener('click',() => {
                const col = parseInt(btn.dataset.col);
                if(this.controller.isValidMove(col)){
                    dropBall(btn.dataset.col);
                }else{
                    console.log("COL FULL");
                }

            });
        });
    }


    displayBoard(){
        for(let row = 0; row < 6; row++){
            for(let col = 0; col< 7; col++){
                const value = this.controller.readFromCell(row,col)
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
                
    
                switch(value){
                    case 0: cell.style.backgroundColor = "lightgray"; break;
                    case 1: cell.style.backgroundColor = "yellow"; break;
                    case 2: cell.style.backgroundColor = "red"; break;
                }
    
            }
        }
    }

}