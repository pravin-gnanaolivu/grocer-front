import React from "react"
import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from "./index"
import { itemTotal } from "../helpers/cartHelpers"

const CheckoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      itemTotal() >= 1 ? (
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      ) : (
        <Redirect
          to={{
            pathname: "/cart",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default CheckoutRoute
