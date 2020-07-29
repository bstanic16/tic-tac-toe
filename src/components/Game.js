import React, { Component } from 'react';
import Board from './Board';
import io from 'socket.io-client';
import styled from 'styled-components';

let boardId = localStorage.getItem('board');

let uId = localStorage.getItem('id')
let uName = localStorage.getItem('name')

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            uId: '',
            uName: '',
            seatId: 0,
            matrix: {},
        }
    }

    componentDidMount() {
        //Socket connection and events
        this.socket = io(`http://178.128.206.150:7000?id=${uId}`);
        if (this.socket.connected === true) {
            this.setState({ uId: uId, uName: uName })
            localStorage.removeItem('id')
            localStorage.removeItem('name')
        }

        this.socket.on('joined', data => {
            console.log("Joined: ", data)
        });

        this.socket.on('left', data => {
            console.log("Left: ", data)
        });

        this.socket.on('marked', data => {
            this.setState({
                matrix: data.matrix
            })
            console.log("Marked: ", data)
        });

        this.socket.on('seat_left', data => {
            console.log("Left", data);
        });

        this.socket.on('restarted', data => {
            console.log("Restarted: ", data)
        });

        console.log(this.socket)
    }
    //Join board 
    joinBoard = (e) => {
        e.preventDefault()
        this.socket.emit('join_room', boardId, res => {
            console.log("Res: ", res)
        });
        if (this.state.seatId === 0) {
            this.setState({
                seatId: 1
            })
        } else if (this.state.seatId === 1) {
            this.setState({
                seatId: 2
            })
        }
        this.props.history.push('/');
    }
    //Handle mark tile and set winner
    handleClick(i) {
        console.log(this.state.matrix)
        const squares = this.state.matrix;
        const winner = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        } else if (!winner && !squares[i]) {
            this.socket.on('tie', data => {
                console.log("Winner: ", data)
            });
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.socket.emit('mark_tile', boardId, i, (responseCode) => {
            console.log(`Ack2: ${responseCode}`);
            console.log(responseCode)
        });
        this.setState({
            xIsNext: !this.state.xIsNext,
        })
    }
    //Leave room 
    leaveRoom = () => {
        this.socket.emit('leave_room', boardId, (responseCode) => {
            console.log(`Ack: ${responseCode}`);
            console.log(responseCode)
        });
    }

    //Leave seat
    leaveSeat = () => {
        console.log("OVO RADI")
        this.socket.emit('leave_seat', boardId, (responseCode) => {
            console.log(`Ack: ${responseCode}`);
            console.log(responseCode)
        });
    }

    //Restart table
    restart = () => {
        this.socket.emit('restart', boardId, (res) => {
            console.log(`AckR: ${res}`);
            console.log(res)
        });
        this.setState({
            matrix: {},
            xIsNext: true
        })
    }

    render() {

        const winner = calculateWinner(this.state.matrix);

        let status
        if (winner) {
            status = 'Winner is' + winner;
            //trigger event for winner
            this.socket.on('win', data => {
                console.log("Winner: ", data)
            });
        } else {
            status = 'Next player is ' + this.state.xIsNext ? 'X' : 'O';
        }

        return (
            <Wrapper>
                <Center>
                    <Button onClick={(boardId) => this.joinBoard(boardId)}>Join</Button>
                </Center>
                <Gamee>
                    <div className="game-board">
                        <Board onClick={(i) => this.handleClick(i)} squares={this.state.matrix} />
                    </div>
                    <GameInfo>
                        <Status>{status}</Status>
                    </GameInfo>
                </Gamee>
                <Div>
                    <Button1 onClick={() => this.restart()}>Restart</Button1>
                    <Button1 onClick={() => this.leaveSeat()}>Leave seat</Button1>
                    <Button1 onClick={() => this.leaveRoom()}>Leave</Button1>
                </Div>
            </Wrapper>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    background:black;
`

const Center = styled.div`
    width:20%;
    margin:auto;
    padding: 2rem 0rem;
    @media(max-width: 1024px) {
        width:30%;
    }
    @media(max-width: 768px) {
        width:40%;
    }

    @media(max-width: 568px) {
        width:60%;
    }

`
const Button = styled.button`
    width:100%;
    height:40px;
    border: 2px solid #00FFFF;
    background:black;
    color: #00FFFF;
    font-size:21px;
    border-radius:20px;
    &:hover {
        cursor:pointer;
        color: #90EE90;
    }
`

const Button1 = styled.button`
    width:15%;
    height:40px;
    border: 2px solid #00FFFF;
    background:black;
    color: #00FFFF;
    font-size:21px;
    border-radius:20px;
    &:hover {
        cursor:pointer;
        color: #90EE90;
        border: 2px solid #90EE90;
    }

    @media(max-width: 1024px) {
        width:20%;
    }
    
    @media(max-width: 768px) {
        width:30%;
    }

    @media(max-width: 400px) {
        width:35%;
        font-size:15px;
    }
`

const Div = styled.div`
    background:black;
    width:100%;
    text-align:center;
    padding: 1rem 1rem;
    
`

const Gamee = styled.div`
    position: absolute;
    top:60%;
    left:50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
    margin: 0 auto;

    @media(max-width: 768px) {
        top:40%;
        left:50%;
        width:40vw;
    } 

    @media(max-width: 570px) {
        top:40%;
        left:60%;
        width:50vw;
    } 

    @media(max-width: 400px) {
        top:60%;
        width:70vw;
        margin:auto;
    } 
`

const Status = styled.div`
    margin-bottom: 10px;
    color:white;
`

const GameInfo = styled.div`
    margin-left: 20px;
`