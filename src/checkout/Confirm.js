import React, { Fragment, useEffect } from "react"
import shopping from "../svg/purchase.svg"
import { emptyCart } from "../helpers/cartHelpers"
import history from "../history"

const Confirm = () => {
  useEffect(() => {
    emptyCart(() => {
      setTimeout(() => {
        history.push("/")
      }, 5000)
    })
  }, [])
  return (
    <Fragment>
      <img style={{ width: "100%", objectFit: "contain" }} src={shopping} alt="order confirmed" />
    </Fragment>
  )
}

export default Confirm
