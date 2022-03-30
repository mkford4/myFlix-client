import React from 'react';
import ReactDOM from 'react-dom';
//import MainView root component
import { MainView } from './components/main-view/main-view';

//import to bundle scss file with jsx
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

//Finds the root of your app
const container = document.getElementById('root');

//Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

