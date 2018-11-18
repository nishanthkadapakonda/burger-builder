import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';

//creating a store for redux
const store = createStore(reducer);

function requireAuth(nextState, replaceState) {
    alert("hh")
    window.location.href='/';
  }

const app = (
    //Provider method is used to make availble created store to the application
    <Provider store={store}>
        <BrowserRouter>
            <App requireAuth = {requireAuth}/>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
