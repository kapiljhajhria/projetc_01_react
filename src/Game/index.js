import React, {useState} from 'react'
import './styles.css'
import Grid from "../Grid";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //initial state of grid
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
        // console.log('hey23');
        let temp = this.state.gameArray[index];
        // console.log('temp:'+temp);
        return (
            this.setState({
                squares: temp,

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
            this.addHistoryBtn(tempGameArray);
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
                history: [<div>Game History</div>]
            })

        );
    }

    continueGameFromCurrentState(squaresCopy) {
        let moves = squaresCopy.filter((x) => x != null).length;
        let newGameArray = this.state.gameArray.slice(0, moves + 1);
        let newStatus = moves % 2 === 0 ? 'Player X turn' : 'Player O turn';
        let newHistory = this.state.history.slice(0, moves + 2);


        this.state.gameArray = newGameArray;
        this.state.isXnext = moves % 2 === 0;
        this.state.status = newStatus;
        this.state.history = newHistory;
        this.state.gameOver = false;
        this.state.isGameDraw = false;
    }

    addHistoryBtn(gameArray) {
        let gameArrayCopy = [].concat(gameArray);
        let historyCopy = [].concat(this.state.history);
        let moves = gameArray.length;
        if (moves === 2) {
            historyCopy.push(
                <div className={"historybtn"}>
                    <div>
                        {moves - 1}.
                        <button onClick={() => {
                            this.gameReset()
                        }}>
                            Restart Game
                        </button>
                    </div>
                </div>
            );
        }
        historyCopy.push(
            <div className={"historybtn"}>
                <div>
                    {moves}.
                    <button onClick={() => {
                        this.onHistoryBtnPress(moves - 1)
                    }}>
                        Go back to move no {moves - 1}
                    </button>
                </div>
            </div>
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
                        <Grid squares={this.state.squares} handleClick={(index) => this.handleClick(index)}/>
                    </div>
                </div>
                <div className={"right"}>
                    {this.state.history}
                </div>
            </div>

        );
    }
}

function GameF() {
    const [gameArray, setGameArray] = useState([Array(9).fill(null)]);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXnext,setIsNext] = useState(true);
    const [status,setStatus] = useState('Player X turn');
    const [gameOver,setGameOver] = useState(false);
    const [isGameDraw,setIsGameDraw]  = useState(false);
    const [history,setHistory] = useState([<div>Game History</div>]);

    const onHistoryBtnPress=(index)=>{
        console.log(gameArray.length);
        console.log(gameArray);
        let temp = gameArray[index];
        console.log('temp is :'+temp);
        setSquares(temp);
    }

    const handleClick = (index) => {
        let squaresCopy = [].concat(squares);
        if (squaresCopy[index] !== null) {
            return;
        }
        if (squares.filter((x) => x !== null).length !== gameArray.length - 1) {
            continueGameFromCurrentState(squaresCopy);

        }
        if (gameOver) {
            if (isGameDraw) {
                alert("No More Moves left, Please start over");
            } else {
                alert("game Won, refresh page to start over");
            }

        } else {
            let squaresCopy = [].concat(squares);
            if (squaresCopy[index] !== null) {
                return;
            }
            if (squares.filter((x) => x !== null).length !== gameArray.length - 1) {
                continueGameFromCurrentState(squaresCopy);

            }
            squaresCopy[index] = isXnext ? 'X' : 'O';
            let tempGameArray = gameArray.slice();
            tempGameArray.push(squaresCopy);
            console.log('this tempArray will be pushed to addHistoryBtn andits length is '+tempGameArray.length);
            addHistoryBtn(tempGameArray);
            // console.log('tempGameArray is :'+tempGameArray);
            if (gameWon(squaresCopy)) {
                setGameArray(tempGameArray);
                setSquares(squaresCopy);
                setStatus(!isXnext ? 'Player O Won' : 'Player X Won');
                setGameOver(true);
            } else if (gameDraw(squaresCopy)) {
                setGameArray(tempGameArray);
                setSquares(squaresCopy);
                setStatus('Game Drawn');
                setGameOver(true);
                setIsGameDraw(true);
            } else {
                setGameArray(tempGameArray);
                setSquares(squaresCopy);
                setIsNext(!isXnext);
                setStatus(!isXnext ? 'Player O Won' : 'Player X Won');

            }
        }
        //update the state

    }

    const gameDraw=(squaresList)=>{
        return squaresList.every((el) => el !== null);
    }

    const gameWon=(squaresList)=>{
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

    const gameReset=()=>{
        setGameArray([Array(9).fill(null)]);
        setSquares(Array(9).fill(null));
        setIsNext(true)
        setStatus('Player X turn');
        setGameOver(false);
        setIsGameDraw(false);
        setHistory([<div>Game History</div>]);
    }

    const continueGameFromCurrentState=(squaresCopy) =>{
        let moves = squaresCopy.filter((x) => x != null).length;
        let newGameArray = gameArray.slice(0, moves + 1);
        let newStatus = moves % 2 === 0 ? 'Player X turn' : 'Player O turn';
        let newHistory = history.slice(0, moves + 2);

        setGameArray(newGameArray);
        setIsNext(moves % 2 === 0)
        setStatus(newStatus);
        setGameOver(false);
        setIsGameDraw(false);
        setHistory(newHistory);
        // gameArray = newGameArray;
        // isXnext = moves % 2 === 0;
        // status = newStatus;
        // history = newHistory;
        // gameOver = false;
        // isGameDraw = false;
    }
    const addHistoryBtn=(gameArray)=> {
        let gameArrayCopy = [].concat(gameArray);
        console.log('history length so far is :'+history.length);
        let historyCopy = [].concat(history);
        let moves = gameArray.length-1;
        console.log('moves are:'+moves);
        if (moves === 1) {
            historyCopy.push(
                <div className={"historybtn"}>
                    <div>
                        {moves - 1}.
                        <button onClick={() => {
                            gameReset()
                        }}>
                            Restart Game
                        </button>
                    </div>
                </div>
            );
        }
        historyCopy.push(
            <div className={"historybtn"}>
                <div>
                    {moves}.
                    <button onClick={() => {
                        onHistoryBtnPress(moves )
                    }}>
                        Go back to move no {moves}
                    </button>
                </div>
            </div>
        );
        setHistory(historyCopy);
    }



    return (
        <div className="gameboard">
            <div className="left">
                <div className={"gamestatus"}>{status}</div>
                <div>
                    <Grid squares={squares} handleClick={(index) => handleClick(index)}/>
                </div>
            </div>
            <div className={"right"}>
                {history}
            </div>
        </div>

    );

}

export default Game;