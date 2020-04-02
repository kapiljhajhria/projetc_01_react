import React from 'react'
import './styles.css'

class Square extends React.Component {

    render() {
        return (
            <button className="button-square" onClick={() => this.props.squarePressed()}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;