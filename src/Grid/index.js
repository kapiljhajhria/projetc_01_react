import React from 'react';
import Square from "../Square";
import './styles.css'

class Grid extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="row1">
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                </div>
                <div className="row2">
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>

                </div>
                <div className="row3">
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                </div>
            </div>
        );
    }
}


export default Grid;