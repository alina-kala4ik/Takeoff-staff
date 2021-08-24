import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./styles/style.scss";
import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import createAPI from "./api";
import history from "./history";

const onServerError = () => {
  history.push('/error');
};

const onUnauthorized = (response) => {
  history.push('/auth');
};

const api = createAPI(onServerError, onUnauthorized);

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));

const init = () => {
    ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector('#root')
    );
};

init();
