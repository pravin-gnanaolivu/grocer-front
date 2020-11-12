import React, { useEffect, useState } from "react"
import Toolbar from "@material-ui/core/Toolbar"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import { isAuthenticated } from "../auth"
import { Grid, List, Image, Loader, Dimmer } from "semantic-ui-react"
import { getPurchaseHistory } from "../apis/history"
import { Divider } from "semantic-ui-react"
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder"
import moment from "moment"
import ClearIcon from "@material-ui/icons/Clear"
import Layout from "../components/Layout"

import "../styles/App.css"

const useStyles = makeStyles(theme => ({
  card: {
    margin: "1rem",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgb(114 226 115)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgb(114 226 115)"
    },
    overflow: "scroll"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(to bottom right, #9be15d, #00e3ae)"
  },
  content: {
    textAlign: "left",
    position: "relative",
    height: "100vh"
  },
  content1: {
    textAlign: "left",
    position: "relative"
  },
  listStyle: {
    fontFamily: "Megrim",
    // color: "white",
    backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae) !important",
    // -webkit-background-clip: text;
    WebkitBackgroundClip: "text",
    // backgroundClip: "text",
    color: "transparent !important",
    textTransform: "uppercase",
    fontWeight: "bold",
    // textAlign: "center",
    // transform: "skew(-5deg, -5deg)",
    fontSize: "1.2rem",
    backgroundClip: "text",
    position: "relative"
  },
  user: {
    fontSize: "20rem",
    // backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae) !important",
    color: "#9be15d"
  },
  editIcon: {
    color: "#9be15d",
    cursor: "pointer",
    float: "right",
    margin: ".5rem, 1rem",
    fontSize: "2rem"
  }
}))

const UserDashboard = () => {
  const classes = useStyles()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    user: { _id, name, email, role }
  } = isAuthenticated()
  const token = isAuthenticated().token
  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setLoading(false)
        setHistory(data)
      }
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
  }, [])

  useEffect(() => {
    init(_id, token)
  }, [])

  const renderErrorImage = () => {
    // setTimeout(() => {
    return (
      <React.Fragment>
        <h1 style={{ color: "#70e173" }}>No active orders</h1>
        <div style={{ display: "flex", justifyContent: " center" }}>
          <svg id="fa31da1d-917f-4e54-b738-e4bf96d4c31c" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="427.96506" height="546.26859" viewBox="0 0 427.96506 546.26859">
            <polygon points="257.738 535.649 0 535.649 0 533.543 258.12 533.543 257.738 535.649" fill="#3f3d56" />
            <polygon points="89.053 505.128 74.053 506.128 76.053 349.128 113.053 349.128 89.053 505.128" fill="#a0616a" />
            <polygon points="161.053 505.128 146.053 506.128 148.053 349.128 171.983 349.134 161.053 505.128" fill="#a0616a" />
            <path d="M563.07022,664.99341c-15.70166,7.16095-30.46015,6.79583-44.50812.76083l-7.49188-179.76083L489.6116,664.18072c-15.69074,3.882-31.55036,3.865-47.54138.81269,3.6831-26.69269,19.40612-189.19538,18-219l105-5Z" transform="translate(-386.01747 -176.86571)" fill="#2f2e41" />
            <path d="M472.38764,723.13429h0a15.1713,15.1713,0,0,1-15.1448-16.06765l1.44716-24.4515c5.82716-10.44764,12.9-10.48986,21.14323-.75512l6.97824,21.39945A15.17131,15.17131,0,0,1,472.38764,723.13429Z" transform="translate(-386.01747 -176.86571)" fill="#2f2e41" />
            <path d="M543.38764,723.13429h0a15.1713,15.1713,0,0,1-15.1448-16.06765l1.44716-24.4515c5.82716-10.44764,12.9-10.48986,21.14323-.75512l6.97824,21.39945A15.17131,15.17131,0,0,1,543.38764,723.13429Z" transform="translate(-386.01747 -176.86571)" fill="#2f2e41" />
            <circle cx="137.05274" cy="41.1277" r="29" fill="#a0616a" />
            <path d="M522.07022,272.99341l-47-19c11.248-5.51334,18.885-15.75937,25-28h21C520.06851,244.67119,519.26181,262.90918,522.07022,272.99341Z" transform="translate(-386.01747 -176.86571)" fill="#a0616a" />
            <path d="M568.07022,447.99341l-112,3c1.364-53.77922-1.02882-109.1162-6.64346-165.7891a29.127,29.127,0,0,1,18.76745-30.1324l10.876-4.0785,44,12,20.766,15.9206a21.257,21.257,0,0,1,8.24412,18.348C548.93654,343.17338,555.956,394.281,568.07022,447.99341Z" transform="translate(-386.01747 -176.86571)" fill="#63ff90" />
            <path d="M580.55763,485.8702h0a11.66222,11.66222,0,0,1-12.26574-10.35548l-2.4756-22.29213,13.23085-3.68608,10.92467,18.84112A11.66222,11.66222,0,0,1,580.55763,485.8702Z" transform="translate(-386.01747 -176.86571)" fill="#a0616a" />
            <path d="M592.07022,454.99341l-26,1-20-80-5-99h0a20.76177,20.76177,0,0,1,18.02261,17.99714l8.97738,71.00286Z" transform="translate(-386.01747 -176.86571)" fill="#63ff90" />
            <polygon points="82.553 129.628 81.553 195.628 125.553 269.628 86.553 193.628 82.553 129.628" opacity="0.2" />
            <polygon points="69.277 229.313 95.356 274.128 86.114 273.628 69.277 229.313" opacity="0.2" />
            <path d="M515.70091,397.45777a4.59435,4.59435,0,0,0-4.589,4.589V686.56285a4.59435,4.59435,0,0,0,4.589,4.58895H809.39358a4.59435,4.59435,0,0,0,4.58895-4.58895V402.04672a4.59435,4.59435,0,0,0-4.58895-4.589Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M522.61173,679.652H802.48234V408.95768H522.61173Z" transform="translate(-386.01747 -176.86571)" fill="#fff" />
            <path d="M547.53888,452.08294c-1.86725,0-3.38649,2.67629-3.38649,5.96563s1.51924,5.96564,3.38649,5.96564H675.18372c1.86725,0,3.3865-2.67629,3.3865-5.96564s-1.51925-5.96563-3.3865-5.96563Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M547.53888,488.79452c-1.86725,0-3.38649,2.67629-3.38649,5.96564s1.51924,5.96563,3.38649,5.96563H675.18372c1.86725,0,3.3865-2.67629,3.3865-5.96563s-1.51925-5.96564-3.3865-5.96564Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M547.53888,525.08294c-1.86725,0-3.38649,2.67629-3.38649,5.96563s1.51924,5.96564,3.38649,5.96564H675.18372c1.86725,0,3.3865-2.67629,3.3865-5.96564s-1.51925-5.96563-3.3865-5.96563Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M547.53888,561.79452c-1.86725,0-3.38649,2.67629-3.38649,5.96564s1.51924,5.96563,3.38649,5.96563H675.18372c1.86725,0,3.3865-2.67629,3.3865-5.96563s-1.51925-5.96564-3.3865-5.96564Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M739.8522,452.47555a5.96563,5.96563,0,0,0,0,11.93126h23.86253a5.96563,5.96563,0,0,0,0-11.93126Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M739.8522,488.47555a5.96563,5.96563,0,0,0,0,11.93126h23.86253a5.96563,5.96563,0,0,0,0-11.93126Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M739.8522,524.47555a5.96563,5.96563,0,0,0,0,11.93126h23.86253a5.96563,5.96563,0,0,0,0-11.93126Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M739.8522,560.47555a5.96563,5.96563,0,0,0,0,11.93126h23.86253a5.96563,5.96563,0,0,0,0-11.93126Z" transform="translate(-386.01747 -176.86571)" fill="#e6e6e6" />
            <path d="M732.5805,620.8397a7.60148,7.60148,0,0,0,0,15.203h30.40593a7.60148,7.60148,0,0,0,0-15.203Z" transform="translate(-386.01747 -176.86571)" fill="#63ff90" />
            <rect x="158.55274" y="423.6277" width="225" height="2" fill="#e6e6e6" />
            <path d="M518.41561,480.94406l0,0a11.66224,11.66224,0,0,1-15.30254-4.84941l-10.84868-19.63095,10.79986-8.4856,17.32392,13.19918A11.66221,11.66221,0,0,1,518.41561,480.94406Z" transform="translate(-386.01747 -176.86571)" fill="#a0616a" />
            <path d="M511.07022,448.99341l-22,12-50-86-5.762-75.62608a39.49893,39.49893,0,0,1,25.27824-39.8948l6.48375-2.47908,4,114Z" transform="translate(-386.01747 -176.86571)" fill="#63ff90" />
            <path d="M547.67761,186.16433,548,191l-2.48987-6.63965a38.65038,38.65038,0,0,0-21.484-7.36694l-.00006-.00006A28.48408,28.48408,0,0,0,493.724,212.839l.34619,4.15442,8-11h.00006a28.12412,28.12412,0,0,1,27.075-6.07258,47.71738,47.71738,0,0,1,10.01789,4.36524,55.04778,55.04778,0,0,1,12.9071,10.70734l.69495-4.72559C557.436,201.48177,554.65552,192.56258,547.67761,186.16433Z" transform="translate(-386.01747 -176.86571)" fill="#2f2e41" />
          </svg>
        </div>
      </React.Fragment>
    )
    // }, 2000)
  }

  const renderHistory = () => {
    if (!loading) {
      return (
        <Dimmer active inverted>
          <Loader size="big">Loading</Loader>
        </Dimmer>
      )
    } else {
      return (
        <React.Fragment>
          <h1 style={{ color: "#70e173" }}>Your Order history</h1>
          {history.map((h, i) => {
            return (
              <React.Fragment key={i}>
                <Divider />
                <span className="order-time">
                  <QueryBuilderIcon style={{ marginRight: "1rem", fill: "#81e26b" }} />
                  <div>
                    {moment(h.createdAt).fromNow()} ({moment(h.createdAt).format("ddd, MMM Do YYYY, h:mm:ss a")})
                  </div>
                </span>

                {h.products.map((product, i) => (
                  <div key={i}>
                    <div className="order-style">
                      <div>{product.title}</div>
                      <span style={{ fontSize: "0.8rem" }}>(₹{product.price})</span>
                      <div>
                        <ClearIcon style={{ margin: "0 1rem 0 1rem" }} />
                      </div>
                      <div>{product.count}</div>
                    </div>
                  </div>
                ))}
                <div className="total-style" key={i}>
                  <div style={{ marginRight: "1rem" }}>Total:</div>
                  <div style={{ color: "#7be16d" }}>₹{h.amount}</div>
                </div>
              </React.Fragment>
            )
          })}
        </React.Fragment>
      )
    }
  }
  return (
    <Layout>
      <Toolbar />
      <Toolbar />

      <Grid stackable columns={3}>
        <Grid.Column width={5}>
          <Card className={classes.card}>
            <CardContent className={classes.content1}>
              <div style={{ margin: "0rem" }}>
                <List>
                  <List.Item>
                    <Image avatar src="https://p.kindpng.com/picc/s/78-785904_block-chamber-of-commerce-avatar-white-avatar-icon.png" />
                    <List.Content>
                      <List.Header style={{ color: "#7ce26e" }}>{name}</List.Header>
                      <List.Description>{email}</List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </div>
            </CardContent>
          </Card>
        </Grid.Column>
        <Grid.Column width={11}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>{history.length >= 1 ? renderHistory() : renderErrorImage()}</CardContent>
          </Card>
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

export default UserDashboard
