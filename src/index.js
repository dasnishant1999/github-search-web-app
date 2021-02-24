import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import { GithubProvider } from "./context/context";

//dev-u4t1day3.us.auth0.com
//OBnY5RSGXgaNB6HauDgAErxHrnDRrnk9

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-u4t1day3.us.auth0.com"
      clientId="OBnY5RSGXgaNB6HauDgAErxHrnDRrnk9"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
