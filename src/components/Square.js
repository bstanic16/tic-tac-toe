import React from 'react'
import styled from 'styled-components'

export default function Square(props) {
    return (
        <Squaree onClick={props.onClick}>
            {props.value}
        </Squaree>
    )
}

const Squaree = styled.button`
    background: #00FFFF;
    border: 2px solid #00F2FF;
    float:left;
    margin-right:-1px;
    margin-top: -1px;
    padding: 0;
    width:90px;
    height:90px;
    text-align: center;
    font-size:40px;
    font-weight:bold;
    line-height: 80px;
    border-radius:20px;
    &:focus{
    outline: none;
    }
    &:hover {
        cursor:pointer;
    }

    @media(max-width: 768px) {
        width:70px;
        height:70px;
    }

    @media(max-width: 568px) {
        width:50px;
        height:50px;
    }
`