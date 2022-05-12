import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap/';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());
//Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

//Finds the root of your app
const container = document.getElementById('root');

//Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

