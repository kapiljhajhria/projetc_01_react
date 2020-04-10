import React from 'react'
import './styles.css'

function Square(props){

    return (
        <button className="button-square" onClick={() => props.squarePressed()}>
            {props.value}
        </button>
    );

}

export default Square;