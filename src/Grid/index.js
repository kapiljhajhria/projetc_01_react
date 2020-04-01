import React from 'react';
import Square from "../Square";
import './styles.css'

class Grid extends React.Component {
    getGridRow(offset){
        return(
            <div className="gridRow">
                <Square indexNumber={offset+0}></Square>
                <Square indexNumber={offset+1}></Square>
                <Square indexNumber={offset+2}></Square>

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