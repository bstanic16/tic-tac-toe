import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';

export default class CreatePlayer extends Component {
    state = {
        name: '',
        id: ''
    }
    //Listen for name change and set state
    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    //Create player
    submit = (e) => {
        e.preventDefault()
        const apikey = process.env.REACT_APP_API_KEY;
        let params = {
            name: this.state.name,
            apikey: apikey
        }
        axios.post(`http://178.128.206.150:7000/player/`, params)
            .then(res => {
                console.log("Make player: ", res)
                this.setState({
                    id: res.data.id
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        console.log(this.state.name);
        console.log(this.state.id);
        localStorage.setItem('id', this.state.id)
        localStorage.setItem('name', this.state.name)
        return (
            <Wrapper>
                <Div>
                    <InDiv>
                        <Input id="name" placeholder="Enter your name" onChange={this.onNameChange}></Input>
                    </InDiv>
                    <BuDiv>
                        <Button onClick={this.submit}>Create player</Button>
                    </BuDiv>
                </Div>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    background:black;
`

const Div = styled.div`
    width:40vw;
    margin:auto;
    padding-top:15%;
    left:40%;
    background:black;
    
    @media(max-width: 768px) {
        width:50vw;
    }

    @media(max-width: 568px) {
        width:70%;
    }
`

const InDiv = styled.div`
    padding:1rem 0rem;
    width:80%;
    margin:auto;
`

const BuDiv = styled.div`
    padding:1rem 0rem;
    width:50%;
    margin:auto;
    @media(max-width: 568px) {
        width:60%;
    }
`

const Input = styled.input`
    width: 100%;
    height:40px;
    background: #00FFFF;
    border:0px;
    text-align:center;
    border-radius:30px;
    font-size:21px;
    @media(max-width: 568px) {
        font-size:17px;
    }
`

const Button = styled.button`
    width:100%;
    height:50px;
    border: 2px solid #00FFFF;
    background:black;
    color: #00FFFF;
    font-size:21px;
    border-radius:20px;
    &:hover {
        cursor:pointer;
        color: #90EE90;
    }
    @media(max-width: 568px) {
        font-size:17px;
    }
`
