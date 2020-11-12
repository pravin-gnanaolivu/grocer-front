import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { Grid, Divider } from "semantic-ui-react"
import { getCart } from "../helpers/cartHelpers"
import { Toolbar } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import RenderCartItems from "./RenderCartItems"
import { itemTotal } from "../helpers/cartHelpers"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import svg from "../svg/empty.svg"
import "../styles/App.css"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import history from "../history"

const useStyles = makeStyles({
  card: {
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "20%",
    width: "180px !important"
  },

  subHeading: {
    fontSize: "2rem",
    fontFamily: "inherit"
  },
  content: {
    textAlign: "left",
    position: "relative"
  },
  product_title: {
    // backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae)",
    fontFamily: "Megrim",
    // fontWeight: "bold",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "currentColor",
    fontWeight: "bold",
    transform: "skew(-5deg, -5deg)",
    fontSize: "2.8rem",
    position: "relative",
    marginBottom: "20px"
  },
  actions: {
    justifyContent: "flex-end",
    padding: "1rem 1rem",
    marginTop: "-1rem"
  },
  description: {
    marginLeft: "2rem"
  },
  priceSummary: {
    display: "flex",
    flexDirection: "column",
    margin: "12px"
  },
  price: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10px",
    backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent"
  },
  checkBtn: {
    margin: "10px",
    float: "right"
  }
})

const Cart = () => {
  const classes = useStyles()
  const [item, setItem] = useState([])
  const [run, setRun] = useState(false)
  let [total, setTotal] = useState(0)

  useEffect(() => {
    setItem(getCart())
  }, [run])

  const renderCartItems = () => {
    if (item.length < 1) return <div>{/* <Card className={classes.card}>
            <CardContent>
            </CardContent>
          </Card> */}</div>

    return item.map(product => {
      return (
        <div key={product._id}>
          <RenderCartItems product={product} setRun={setRun} run={run} />
        </div>
      )
    })
  }

  const renderPriceList = () => {
    return (
      <div>
        <Card className={classes.card}>
          <h4 style={{ padding: "15px 15px 10px" }}>Price Details</h4>
          <Divider />
          <div className={classes.priceSummary}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                Price({itemTotal()}) {itemTotal() > 1 ? "items" : "item"}
              </div>
              <div className={classes.price}>
                {item.map(product => {
                  total += product.price * product.count
                })}
                ₹{total}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Delivery Charges</div>
              <div className={classes.price}>Free</div>
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Total</div>
              <div className={classes.price}>₹{total}</div>
            </div>
          </div>
        </Card>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/checkout">
            <Button className="checkoutBtn">place order</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Toolbar />
      <div className="project_detail">
        <div>
          <ArrowBackIcon className="backBtn" onClick={() => history.goBack()} />
        </div>
        {item.length < 1 ? (
          <div>
            <h1 style={{ color: "#9be15d" }}>Your cart is empty</h1>
            <div style={{ display: "flex", margin: "7rem", alignItems: "center", justifyContent: "center" }}>
              <img src={svg} alt="your cart is empty" style={{ width: "50vh" }} />
            </div>
          </div>
        ) : (
          <Grid stackable reversed="mobile vertically" columns={2}>
            <Grid.Column width={10}>
              <Card className={classes.card}>
                <h4 style={{ padding: "15px 15px 10px" }}>My Cart ({item.length})</h4>
                {renderCartItems()}
              </Card>
            </Grid.Column>
            <Grid.Column width={6}>{item.length < 1 ? <div></div> : <div>{renderPriceList()}</div>}</Grid.Column>
          </Grid>
        )}
      </div>
    </Layout>
  )
}

export default Cart
