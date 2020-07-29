import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
        }
    }

    componentDidMount() {
        const apikey = process.env.REACT_APP_API_KEY;
        let params = {
            apikey: apikey
        }
        //Get boards
        axios.post(`http://178.128.206.150:7000/boards/`, params)
            .then(res => {
                this.setState({
                    boards: res.data
                })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    //Create board
    createBoard = (e) => {
        const apikey = process.env.REACT_APP_API_KEY;
        let params = {
            apikey: apikey
        }
        //Creating board
        axios.post(`http://178.128.206.150:7000/create_board/`, params)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    //Send you to room with exact id, you need to join
    joinBoard(id) {
        localStorage.setItem('board', id);
        this.props.history.push('/');
    }

    render() {
        console.log("state", this.state.boards)
        return (
            <>
                <Wrapper>
                    <CreateDiv>
                        <Button onClick={this.createBoard}>Create New Board</Button>
                    </CreateDiv >
                    <Main>
                        {this.state.boards.map((board) => (
                            <Block>
                                <P>Table: {board.id}</P>
                                <P>Players: {board.players}</P>
                                <ButDiv>
                                    <Button onClick={(id) => this.joinBoard(board.id)}>Join</Button>
                                </ButDiv>
                            </Block>
                        ))}
                    </Main>
                </Wrapper>
            </>
        )
    }
}

const Wrapper = styled.div`
    width:100%;
    background:black;
`

const CreateDiv = styled.div`
    width:20%;
    height:auto;
    margin:auto;
    padding: 1rem 0rem;
    background:black;
    @media(max-width: 1024px) {
        width:30%;
    }
    @media(max-width: 768px) {
        width:40%;
    }
    @media(max-width: 568px) {
        width:70%;
    }
`


const ButDiv = styled.div`
    width:30%;
    height:auto;
    margin:auto;
    padding: 1rem 0rem;

    @media(max-width: 568px) {
        width:70%;
    }

`

const Button = styled.button`
    width:100%;
    height:40px;
    border: 2px solid #00FFFF;
    background:black;
    color: #00FFFF;
    font-size:18px;
    border-radius:20px;
    &:hover {
        cursor:pointer;
        color: #90EE90;
    }

    @media(max-width: 568) {
        font-size:16px!important;
    }

`

const P = styled.p`
    text-align:center;
    color:#D2691E;
    @media(max-width: 568px) {
        font-size:13px;
    }
`


const Main = styled.div`
    width:90%;
    margin:auto;
    display:grid;
    grid-template-columns: 50% 50%;
    
    @media(max-width: 768px) {
        grid-template-columns: 100%;
    }
`


const Block = styled.div`
    width:100%;
    background: black;
    border:1px solid #00FFFF;
    border-radius:10px;
`