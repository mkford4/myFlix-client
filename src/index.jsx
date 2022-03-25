import React from 'react';
import ReactDOM from 'react-dom';
//import MainView root component
import { MainView } from './components/main-view/main-view';
import { Container, Col, Row } from 'react-bootstrap/';

//import to bundle scss file with jsx
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

