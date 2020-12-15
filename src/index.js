import React from "react"
import ReactDOM from "react-dom"

import App from "./components/App"
import "semantic-ui-css/semantic.min.css"
import { Offline, Online } from "react-detect-offline"
import InternetConnectionError from "./components/InterConError"

require("dotenv").config()

ReactDOM.render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <InternetConnectionError />
    </Offline>
  </>,
  document.querySelector("#root")
)
