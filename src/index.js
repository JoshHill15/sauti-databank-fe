import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import App from "./dashboard/App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import universalReducer from "./universalReducer";

import { BrowserRouter as Router } from "react-router-dom";
//comments

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  universalReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

const client = new ApolloClient({
  // uri: `${process.env.REACT_APP_BACKEND_URL}`
  uri: "http://localhost:2500/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
