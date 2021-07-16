import React, { Component } from 'react'


class ValidationError extends Component {

    render() {
        return (
            <div style={{color: 'red'}}>
            {this.props.children}
        </div>
        )
    }
}


export default ValidationError