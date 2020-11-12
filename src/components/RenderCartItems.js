import React, { useState } from "react"
import CardMedia from "@material-ui/core/CardMedia"
import { API } from "../config"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import { Divider } from "semantic-ui-react"
import { updateItem, removeItem } from "../helpers/cartHelpers"
import { IconButton, Button } from "@material-ui/core"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import history from "../history"
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles({
  card: {
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
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
    marginBottom: "10px"
  },
  actions: {
    justifyContent: "flex-end",
    padding: "1rem 1rem",
    marginTop: "-1rem"
  },
  description: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    // marginLeft: "40px"
  },
  price: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10px",
    fontSize: "1.7rem",
    backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent"
  }
})

const RenderCartItems = ({ product, setRun = f => f, run = undefined }) => {
  const classes = useStyles()
  let [count, setCount] = useState(product.count)

  const onHandleIncrement = productId => {
    setRun(!run)
    setCount(++count)
    updateItem(productId, count)
  }
  const onHandleDecrement = productId => {
    setRun(!run)
    setCount(--count)
    updateItem(productId, count)
  }

  const onRemoveItem = productId => {
    removeItem(productId)
  }

  return (
    <>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <CardMedia className="cartImage" onClick={() => history.push(`/product/details/${product._id}`)} image={`${API}/product/image/${product._id}`} />
          <div className={classes.description}>
            <Link to={`/product/details/${product._id}`}>
              <Typography className="cart_title">{product.title}</Typography>
            </Link>
            <div>
              <div className="cartActions">
                <IconButton disabled={count <= 1} onClick={() => onHandleDecrement(product._id)}>
                  <RemoveIcon />
                </IconButton>
                <span style={{ margin: "0 10px 0 10px" }}>{count}</span>
                <IconButton onClick={() => onHandleIncrement(product._id)}>
                  <AddIcon />
                </IconButton>
              </div>
            </div>
            <div className={classes.price}>₹{product.price * count}</div>
          </div>
          <IconButton
            onClick={() => {
              onRemoveItem(product._id)
              setRun(!run)
            }}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </div>
        <div></div>

        <Divider />
      </CardContent>
    </>
  )
}

export default RenderCartItems
