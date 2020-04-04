import React from 'react';
import Square from "../Square";
import './styles.css'

class Grid extends React.Component {




    getGridRow(offset) {
        return (
            <div className="gridRow">
                <Square value={this.props.squares[offset + 0]}
                        squarePressed={() => this.props.handleClick(offset + 0)}> </Square>
                <Square value={this.props.squares[offset + 1]}
                        squarePressed={() => this.props.handleClick(offset + 1)}> </Square>
                <Square value={this.props.squares[offset + 2]}
                        squarePressed={() => this.props.handleClick(offset + 2)}> </Square>

            </div>
        );
    }

    render() {
        return (
            <div className="grid">
                {this.getGridRow(0)}
                {this.getGridRow(3)}
                {this.getGridRow(6)}
            </div>
        );
    }
}


export default Grid;