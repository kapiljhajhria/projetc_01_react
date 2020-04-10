import React from 'react';
import Square from "../Square";
import './styles.css'

function Grid(props){
    function getGridRow(offset) {
        return (
            <div className="gridRow">
                <Square value={props.squares[offset + 0]}
                        squarePressed={() => props.handleClick(offset + 0)}> </Square>
                <Square value={props.squares[offset + 1]}
                        squarePressed={() => props.handleClick(offset + 1)}> </Square>
                <Square value={props.squares[offset + 2]}
                        squarePressed={() => props.handleClick(offset + 2)}> </Square>

            </div>
        );
    }

    return (
        <div className="grid">
            {getGridRow(0)}
            {getGridRow(3)}
            {getGridRow(6)}
        </div>
    );
}
export default Grid;