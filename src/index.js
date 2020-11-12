import React from "react"
import ReactDOM from "react-dom"

import App from "./components/App"
import "semantic-ui-css/semantic.min.css"
import { Detector } from "react-detect-offline"
import InternetConnectionError from "./components/InterConError"

require("dotenv").config()

ReactDOM.render(<Detector render={({ online }) => (online ? <App /> : <InternetConnectionError />)} />, document.querySelector("#root"))
