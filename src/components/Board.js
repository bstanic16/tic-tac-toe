import React, { Component } from 'react'
import Square from './Square';

export default class Board extends Component {
    renderSquare(i) {
        console.log("square", this.props.squares[i])
        if (this.props.squares[i] === 1) {
            this.props.squares[i] = 'X'
        }
        else if (this.props.squares[i] === 2) {
            this.props.squares[i] = 'O'
        }
        else {
            this.props.squares[i] = ''
        }
        return <Square value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
    }
    render() {
        return (
            <div>
                <div className="border-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="border-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="border-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
