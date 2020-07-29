import React from 'react';
import './App.css';
import Game from './components/Game';
import CreatePlayer from './components/CreatePlayer'
import Boards from './components/Boards'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <>
        <Main>
          <nav>
            <Ul>
              <Li><Link to="/create-player">Create Player</Link></Li>
              <Li><Link to="/boards">Boards</Link></Li>
              <Li><Link to="/">Game</Link></Li>
            </Ul>
          </nav>
        </Main>
        <Route path="/" exact component={Game} />
        <Route path="/create-player" component={CreatePlayer} />
        <Route path="/boards" component={Boards} />
      </>
    </Router>
  );
}

const Main = styled.div`
  background: black;
`

const Ul = styled.ul`
  width:40vw;
  margin:auto;
  display:flex;
  align-items:center;
  list-style-type: none;
    @media(max-width: 1024px) {
          width:60vw;
      }

    @media(max-width: 768px) {
        width:70vw;
    }

    @media(max-width: 568px) {
        width:80%;
    }
  
`

const Li = styled.li`
  width:40%;
  padding: 0.5rem 1rem;
  margin: 0rem 1rem;
  border-radius:30px;
  text-align:center;
  a{
    text-decoration:none;
    color:#00FFFF;
  } 
  a:hover {
    color: #90EE90;
    padding: 0.2rem 0rem;
    border-bottom: 2px solid #90EE90;
  }

    @media(max-width: 1024px) {
          width:60vw;
      }

    @media(max-width: 768px) {
        width:70vw;
        margin: 0rem 0.5rem;
        padding: 0rem 0rem;
    }
    
    @media(max-width: 568px) {
        width:60%;
    }
`

export default App;
