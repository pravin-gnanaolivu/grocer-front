import React from "react"
import { Router, Switch, Route } from "react-router-dom"
import Home from "./Home"
import Signin from "../user/Signin"
import Signup from "../user/Signup"
import "../styles/App.css"
import history from "../history"
import Dashboard from "../user/UserDashboard"
import PrivateRoute from "../auth/PrivateRoute"
import AdminRoute from "../auth/AdminRoute"
import CheckoutRoute from "../auth/ChekoutRoute"
import History from "./History"
import updateProfile from "./updateProfile"
import AdminDashboard from "../user/AdminDashboard"
import ProductDetails from "./ProductDetails"
import Cart from "./Cart"
import Checkout from "./Checkout"
const App = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/product/details/:id" component={ProductDetails} />
          <Route exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/user/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/purchaseHistory" component={History} />
          <CheckoutRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/updateProfile" component={updateProfile} />
          <PrivateRoute exact path="/updateProfile" component={updateProfile} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
