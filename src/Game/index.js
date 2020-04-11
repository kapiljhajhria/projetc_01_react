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
    const [rightSideDivList,setRightDivList] = useState([<div>Game History</div>]);

    const onHistoryBtnPress=(index,tempGameArray)=>{
        console.log(`4. in, onHistorypress, moves:${index} gameArrayLength: ${gameArray.length}`);
        let temp = [].concat(tempGameArray)[index];
        // console.log('temp is :'+temp);
        setSquares(temp);
    }

    const handleClick = (index) => {
        let squaresCopy = [].concat(squares);
        if (squaresCopy[index] !== null) {
            return;
        }
        console.log(`current sqcpy is ${squaresCopy} ga length ${gameArray.length}`)
        if (squaresCopy.filter((x) => x !== null).length < gameArray.length - 1) {
            console.log("will try to continue game from history");
            continueGameFromCurrentState(squaresCopy);

        }
        squaresCopy = [].concat(squares);
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
            // console.log('this tempArray will be pushed to addHistoryBtn andits length is '+tempGameArray.length);

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
            console.log('1. all values updated, adding rightSideDivList Button Now');
            console.log(`1. gameArray : ${tempGameArray}`);
            // console.log('adding rightSideDivList button'+`rightSideDivList length:${rightSideDivList}`)
            addHistoryBtn(tempGameArray);
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
        setRightDivList([<div>Game History</div>]);
    }

    const continueGameFromCurrentState=(squaresCopy) =>{
        let moves = squaresCopy.filter((x) => x != null).length;
        let newGameArray = gameArray.slice(0, moves + 1);
        let newStatus = moves % 2 === 0 ? 'Player X turn' : 'Player O turn';
        let newHistory = rightSideDivList.slice(0, moves + 2);
        console.log(`6. inContnue, squares count ${squaresCopy.filter((x) => x != null).length} rDL le:${newHistory.length}`)
        setGameArray(newGameArray);
        setIsNext(moves % 2 === 0)
        setStatus(newStatus);
        setGameOver(false);
        setIsGameDraw(false);
        setRightDivList(newHistory);
    }
    const addHistoryBtn=(tempGameArray)=> {
        let gameArrayCopy = [].concat(tempGameArray);

        let rDivListCopy = [].concat(rightSideDivList);
        let moves = gameArrayCopy.length;
        console.log(`2. addHistoryBtn ,all states variables are already updated rDivList${rDivListCopy.length} moves:${moves} tempgameArray:${tempGameArray.length} last gameArray value: ${tempGameArray}` );
        // console.log('moves are:'+moves);
        if (moves === 2) {
            rDivListCopy.push(
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
        {console.log('3. b4 onHistorybtn press  ');}
        rDivListCopy.push(
            <div className={"historybtn"}>
                <div>
                    {moves}.
                    <button onClick={() => {

                        onHistoryBtnPress(moves-1,tempGameArray)
                    }}>
                        Go back to move no {moves-1}
                    </button>
                </div>
            </div>
        );
        // console.log('rDivListCopy length so far is :'+rDivListCopy.length);
        setRightDivList(rDivListCopy);
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
                {rightSideDivList}
            </div>
        </div>

    );

}

export default GameF;