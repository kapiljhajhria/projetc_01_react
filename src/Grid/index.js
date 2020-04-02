import React from 'react';
import Square from "../Square";
import './styles.css'

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            //initial state of grid
            squares:Array(9).fill(null),
            isXnext:true,
            status:'Player X turn'
        }
    }

    handleClick(index){
        let squaresCopy = this.state.squares.slice();
        if(squaresCopy[index]!==null){
            return;
        }
        squaresCopy[index]=this.state.isXnext?'X':'O';
        //update the state
        this.setState({
            squares:squaresCopy,
            isXnext:!this.state.isXnext,
            status:!this.state.isXnext?'Player X turn':'Plaer O turn',
        })
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
                {this.state.status}
                {this.getGridRow(0)}
                {this.getGridRow(3)}
                {this.getGridRow(6)}
            </div>
        );
    }
}


export default Grid;