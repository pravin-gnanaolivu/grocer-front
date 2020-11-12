import React from "react"
import Appbar from "./Appbar"

const Layout = ({ children }) => (
  <div>
    <Appbar />

    <div>{children}</div>
  </div>
)

export default Layout
