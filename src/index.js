import React from "react"
import ReactDOM from "react-dom/client"

import App from "./components/App"
import "semantic-ui-css/semantic.min.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const client = new QueryClient()

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <ReactQueryDevtools />
  </QueryClientProvider>
)
