import React from "react"
import PersonIcon from "@material-ui/icons/Person"
import Toolbar from "@material-ui/core/Toolbar"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import { isAuthenticated } from "../auth"
import { Grid, List, Image } from "semantic-ui-react"
// import { getPurchaseHistory } from "../apis/history"

import Layout from "../components/Layout"

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 900,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(to bottom right, #9be15d, #00e3ae)"
  },
  content: {
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

const AdminDashboard = () => {
  const classes = useStyles()

  const {
    user: { name, email, role }
  } = isAuthenticated()

  return (
    <Layout>
      <div>
        <Toolbar />
        <Toolbar />

        <Grid stackable columns={2}>
          <Grid.Column width={6}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <div style={{ margin: "1rem" }}>
                  <List>
                    <List.Item>
                      <Image avatar src="https://p.kindpng.com/picc/s/78-785904_block-chamber-of-commerce-avatar-white-avatar-icon.png" />
                      <List.Content>
                        <List.Header as="a">{name}</List.Header>
                        <List.Description>{email}</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </div>
              </CardContent>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>{name}</CardContent>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    </Layout>
  )
}

export default AdminDashboard
