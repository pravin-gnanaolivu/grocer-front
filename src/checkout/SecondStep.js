import React, { useState, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { getBraintreeClientToken, processPayment, createOrder } from "../apis/payment"
import { isAuthenticated } from "../auth"
import DropIn from "braintree-web-drop-in-react"
import { Accordion, Icon } from "semantic-ui-react"
import { getCart } from "../helpers/cartHelpers"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

const SecondStep = ({ handleNext, handleBack, values: { firstName, phone, address1, state, country, city } }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    success: false,
    message: "",
    clientToken: null,
    error: "",
    instance: {}
  })

  const [activeIndex, setActiveIndex] = useState(0)

  const user = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (user, token) => {
    getBraintreeClientToken(user, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error, message: data.error })
      } else {
        setData({ clientToken: data.clientToken })
      }
    })
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    getToken(user, token)

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  const handleClickS = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const getTotal = () => {
    return getCart().reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const onPay = () => {
    let nonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal()
        }

        processPayment(user, token, paymentData)
          .then(response => {
            const createOrderData = {
              products: getCart(),
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: {
                name: firstName,
                phone: phone,
                address: address1,
                state: state,
                city: city,
                country: country
              }
            }

            createOrder(user, token, createOrderData)

            setData({ ...response, success: response.success, message: "Thank you, Your Payment was successful" })
            handleNext()
            console.log(createOrderData)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        setOpen(true)
        setData({ ...data, error: error.message, message: error.message })
      })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Accordion styled>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClickS}>
            <Icon name="dropdown" />
            Credit Card
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <span>
              Note: please use <b>4111 1111 1111 1111</b> card number to make it valid.
            </span>
            {data.clientToken != null ? (
              <div>
                <DropIn options={{ authorization: data.clientToken }} onInstance={instance => (data.instance = instance)} />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button disabled={loading} variant="contained" onClick={onPay} color="primary">
                    Pay
                  </Button>
                </div>
              </div>
            ) : null}
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClickS}>
            <Icon name="dropdown" />
            Paytm
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>Didn't add paytm yet. sorry for the inconvinience</p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={handleClickS}>
            <Icon name="dropdown" />
            Google Pay
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>Didn't add google pay yet. sorry for the inconvinience</p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 3} index={3} onClick={handleClickS}>
            <Icon name="dropdown" />
            Paypal
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <p>Didn't add paypal yet. sorry for the inconvinience</p>
          </Accordion.Content>
        </Accordion>
      </Grid>
      <div style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}>
        <Button variant="contained" color="default" onClick={handleBack} style={{ marginRight: 10 }}>
          Back
        </Button>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={data.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="secondary" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  )
}

export default SecondStep
