import React from 'react'
import './styles.css'

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'0',
            color: 'red'
        }
    }


    render() {
        return (
            <button className="button-square" onClick={() =>
                this.setState({
                    value: 'X',
                    color:'green'
                })}
                    style={{color:this.state.color}}
                    hover={() =>
                this.setState({
                    value:'1'
                })
                }>
                {this.state.value}
            </button>
        );
    }
}

export default Square;