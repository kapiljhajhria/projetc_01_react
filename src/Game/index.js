import React from 'react'
import './styles.css'
import Grid from "../Grid";
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //initial state of grid
            gameArray:[Array(9).fill(null)],
            sqaures:[],
            isXnext: true,
            status: 'Player X turn',
            gameOver: false,
            isGameDraw: false,
            history:[<div>Game History</div>]
        }
    }

    handleClick(index) {
        if (this.state.gameOver) {
            if (this.state.isGameDraw) {
                alert("No More Moves left, Please start over");
            } else {
                alert("game Won, refresh page to start over");
            }

        } else {
            let squaresCopy = this.state.gameArray.slice(-1)[0].slice();
            if (squaresCopy[index] !== null) {
                return;
            }
            squaresCopy[index] = this.state.isXnext ? 'X' : 'O';
            let tempGameArray = this.state.gameArray.slice();
            tempGameArray.push(squaresCopy);
            this.onHistoryBtnPress(tempGameArray);
            if (this.gameWon(squaresCopy)) {

                this.setState({
                    gameArray: tempGameArray,
                    squares: squaresCopy,
                    status: !this.state.isXnext ? 'Player O Won' : 'Plaer X Won',
                    gameOver: true
                });
            } else if (this.gameDraw(squaresCopy)) {
                this.setState({
                    gameArray: tempGameArray,
                    squares: squaresCopy,
                    status: 'Game Drawn',
                    gameOver: true,
                    isGameDraw: true
                });
            } else {
                this.setState({
                    gameArray: tempGameArray,
                    squares: squaresCopy,
                    isXnext: !this.state.isXnext,
                    status: !this.state.isXnext ? 'Player X turn' : 'Player O turn',
                })
            }
        }
        //update the state

    }

    gameDraw(squaresList) {
        return squaresList.every((el) => el !== null);
    }

    gameWon(squaresList) {
        if (squaresList[0] === 'X' && squaresList[1] === 'X' && squaresList[2] === 'X')
            return true;
        else if (squaresList[0] === 'O' && squaresList[1] === 'O' && squaresList[2] === 'O')
            return true;
        else if (squaresList[3] === 'X' && squaresList[4] === 'X' && squaresList[5] === 'X')
            return true;
        else if (squaresList[3] === 'O' && squaresList[4] === 'O' && squaresList[5] === 'O')
            return true;
        else if (squaresList[6] === 'X' && squaresList[7] === 'X' && squaresList[8] === 'X')
            return true;
        else if (squaresList[6] === 'O' && squaresList[7] === 'O' && squaresList[8] === 'O')
            return true;
        else if (squaresList[0] === 'X' && squaresList[3] === 'X' && squaresList[6] === 'X')
            return true;
        else if (squaresList[0] === 'O' && squaresList[3] === 'O' && squaresList[6] === 'O')
            return true;
        else if (squaresList[1] === 'X' && squaresList[4] === 'X' && squaresList[7] === 'X')
            return true;
        else if (squaresList[1] === 'O' && squaresList[4] === 'O' && squaresList[7] === 'O')
            return true;
        else if (squaresList[2] === 'X' && squaresList[5] === 'X' && squaresList[8] === 'X')
            return true;
        else if (squaresList[2] === 'O' && squaresList[5] === 'O' && squaresList[8] === 'O')
            return true;
        else if (squaresList[0] === 'X' && squaresList[4] === 'X' && squaresList[8] === 'X')
            return true;
        else if (squaresList[0] === 'O' && squaresList[4] === 'O' && squaresList[8] === 'O')
            return true;
        else if (squaresList[2] === 'X' && squaresList[4] === 'X' && squaresList[6] === 'X')
            return true;
        else if (squaresList[2] === 'O' && squaresList[4] === 'O' && squaresList[6] === 'O')
            return true;
        return false;
    }

    gameReset(){
        return (
            this.setState({
                gameArray:[Array(9).fill(null)],
                sqaures:[],
                isXnext: true,
                status: 'Player X turn',
                gameOver: false,
                isGameDraw: false,
                history:[<div>Game History</div>]
            })

        );
    }
    onHistoryBtnPress(gameArray) {
        let gameArrayCopy = [].concat(gameArray);
        let historyCopy=[].concat(this.state.history);
        let moves =gameArray.length;
        if(moves===2){
            historyCopy.push(
                <div className={"historybtn"}><div>
                    {moves-1}.
                    <button onClick={()=>{this.gameReset()}}>
                        Restart Game
                    </button>
                </div></div>
            );
        }
        historyCopy.push(
            <div className={"historybtn"}><div>
                {moves}.
                <button>
                  Go back to move no {moves-1}
                </button>
            </div></div>

        );

        return (
            this.setState({
                history: historyCopy,
            })

        );


    }
    render() {
        return (
            <div className="gameboard">
                <div className="left">
                    <div className={"gamestatus"}>{this.state.status}</div>
                    <div>
                        <Grid squares={this.state.gameArray.slice(-1)[0]} handleClick={(index) =>this.handleClick(index)}/>
                    </div>
                </div>
                <div className={"right"}>
                    {this.state.history}
                </div>
            </div>

        );
    }
}

export default Game;