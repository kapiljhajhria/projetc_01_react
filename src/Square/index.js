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
    handleClick(){
        this.setState({
            value: 'X',
            color:'green'
        })
    }

    render() {
        return (
            <button className="button-square" onClick={() =>this.handleClick()
                }
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