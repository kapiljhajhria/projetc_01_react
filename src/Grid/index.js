import React from 'react';
import Square from "../Square";
import './styles.css'

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //initial state of grid
            squares: Array(9).fill(null),
            isXnext: true,
            status: 'Player X turn',
            gameOver: false,
            isGameDraw: false,
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
            let squaresCopy = this.state.squares.slice();
            if (squaresCopy[index] !== null) {
                return;
            }
            squaresCopy[index] = this.state.isXnext ? 'X' : 'O';

            if (this.gameWon(squaresCopy)) {
                this.setState({
                    squares: squaresCopy,
                    status: !this.state.isXnext ? 'Player O Won' : 'Plaer X Won',
                    gameOver: true
                });
            } else if (this.gameDraw(squaresCopy)) {
                this.setState({
                    squares: squaresCopy,
                    status: 'Game Drawn',
                    gameOver: true,
                    isGameDraw: true
                });
            } else {
                this.setState({
                    squares: squaresCopy,
                    isXnext: !this.state.isXnext,
                    status: !this.state.isXnext ? 'Player X turn' : 'Plaer O turn',
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


    getGridRow(offset) {
        return (
            <div className="gridRow">
                <Square value={this.state.squares[offset + 0]}
                        squarePressed={() => this.handleClick(offset + 0)}> </Square>
                <Square value={this.state.squares[offset + 1]}
                        squarePressed={() => this.handleClick(offset + 1)}> </Square>
                <Square value={this.state.squares[offset + 2]}
                        squarePressed={() => this.handleClick(offset + 2)}> </Square>

            </div>
        );
    }

    render() {
        return (
            <div className="grid">
                {this.state.status}
                {this.getGridRow(0)}
                {this.getGridRow(3)}
                {this.getGridRow(6)}
            </div>
        );
    }
}


export default Grid;