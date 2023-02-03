import React from "react"
import ReactDOM from "react-dom"

import App from "./components/App"
import "semantic-ui-css/semantic.min.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const client = new QueryClient()

const rootSelector = document.querySelector("#root")

ReactDOM.render(
  <QueryClientProvider client={client}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>,
  rootSelector
)
