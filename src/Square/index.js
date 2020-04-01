import React from 'react'
import './styles.css'

class Square extends React.Component {
    render() {
        return (
            <button className="button-square">
                {this.props.indexNumber}
            </button>
        );
    }
}

export default Square;