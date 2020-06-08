import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import {createBrowserHistory } from 'history';
import * as serviceWorker from "./archive/serviceWorker";

import App from "./app/layout/App";
import ScrollToTop from "./app/layout/ScrollToTop";
import "./index.css";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <div>
        <App />
      </div>
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
