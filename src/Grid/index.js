import React from 'react';
import Square from "../Square";
import './styles.css'

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            //initial state of grid
            squares:Array(9).fill(null),
        }
    }

    handleClick(index){
        let squaresCopy = this.state.squares.slice();
        squaresCopy[index]='X';
        //update the state
        this.setState({squares:squaresCopy})
    }


    getGridRow(offset){
        return(
            <div className="gridRow">
                <Square value={this.state.squares[offset+0]} squarePressed={()=>this.handleClick(offset+0)}></Square>
                <Square value={this.state.squares[offset+1]} squarePressed={()=>this.handleClick(offset+1)}></Square>
                <Square value={this.state.squares[offset+2]} squarePressed={()=>this.handleClick(offset+2)}></Square>

            </div>
        );
    }
    render() {
        return (
            <div className="grid">
                {this.getGridRow(1)}
                {this.getGridRow(4)}
                {this.getGridRow(7)}
            </div>
        );
    }
}


export default Grid;