import React, {useState} from 'react'
import './styles.css'
import Grid from "../Grid";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameArray: [Array(9).fill(null)],
            squares: Array(9).fill(null),
            isXnext: true,
            status: 'Player X turn',
            gameOver: false,
            isGameDraw: false,
            history: [<div>Game History</div>]
        }
    }

    onHistoryBtnPress(index) {
        let tempBoard = this.state.gameArray[index];
        let numberOfXMoves=tempBoard.filter((el)=>el==="X").length;
        let numberOfOMoves=tempBoard.filter((el)=>el==="O").length;
        let tempStatus=numberOfOMoves===numberOfXMoves?'Player X turn':'Player O turn';
        return (
            this.setState({
                squares: tempBoard,
                status: tempStatus,
            })
        );
    }

    handleClick(index) {
        let squaresCopy = [].concat(this.state.squares);
        if (squaresCopy[index] !== null) {
            return;
        }
        if (this.state.squares.filter((x) => x !== null).length !== this.state.gameArray.length - 1) {
            this.continueGameFromCurrentState(squaresCopy);

        }
        if (this.state.gameOver) {
            if (this.state.isGameDraw) {
                alert("No More Moves left, Please start over");
            } else {
                alert("game Won, refresh page to start over");
            }

        } else {
            // console.log(this.state.squares.filter((x)=>x!==null).length);
            // console.log(this.state.gameArray.length-1);
            let squaresCopy = [].concat(this.state.squares);
            if (squaresCopy[index] !== null) {
                return;
            }
            if (this.state.squares.filter((x) => x !== null).length !== this.state.gameArray.length - 1) {
                this.continueGameFromCurrentState(squaresCopy);

            }
            squaresCopy[index] = this.state.isXnext ? 'X' : 'O';
            let tempGameArray = this.state.gameArray.slice();
            tempGameArray.push(squaresCopy);
            // console.log('tempGameArray is :'+tempGameArray);
            if (this.gameWon(squaresCopy)) {

                this.setState({
                    gameArray: tempGameArray,
                    squares: squaresCopy,
                    status: !this.state.isXnext ? 'Player O Won' : 'Player X Won',
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

    gameReset() {
        return (
            this.setState({
                gameArray: [Array(9).fill(null)],
                squares: Array(9).fill(null),
                isXnext: true,
                status: 'Player X turn',
                gameOver: false,
                isGameDraw: false,
            })

        );
    }

    continueGameFromCurrentState(squaresCopy) {
        let moves = squaresCopy.filter((x) => x != null).length;
        let newGameArray = this.state.gameArray.slice(0, moves + 1);
        let newStatus = moves % 2 === 0 ? 'Player X turn' : 'Player O turn';


        this.state.gameArray = newGameArray;
        this.state.isXnext = moves % 2 === 0;
        this.state.status = newStatus;

        this.state.gameOver = false;
        this.state.isGameDraw = false;
    }

    render() {
        return (
            <div className="gameboard">
                <div className="left">
                    <div className={"gamestatus"}>{this.state.status}</div>
                    <div>
                        <Grid squares={this.state.squares} handleClick={(index) => this.handleClick(index)}/>
                    </div>
                </div>
                <div className={"right"}>
                    {
                        this.state.gameArray.map((board, idx) =>
                            (idx !== 0) ?
                                (
                                    <div className={"historybtn"}>
                                        <div>
                                            {/*{idx}.*/}
                                            <button onClick={() => {
                                                this.onHistoryBtnPress(idx)
                                            }}>
                                                Go back to move no {idx}
                                            </button>
                                        </div>
                                    </div>
                                ) : (<div className={"historybtn"}>
                                    <div>
                                        {/*{moves - 1}.*/}
                                        <button onClick={() => {
                                            this.gameReset()
                                        }}>
                                            Restart Game
                                        </button>
                                    </div>
                                </div>)
                        )}
                </div>
            </div>

        );
    }
}

export default Game;