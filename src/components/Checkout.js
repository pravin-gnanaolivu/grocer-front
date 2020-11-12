import React from "react"
import Layout from "./Layout"
import StepForm from "../checkout/StepForm"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import { Toolbar } from "@material-ui/core"
import { green } from "@material-ui/core/colors"

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    paddingRight: 10,
    paddingLeft: 10
  },
  svg: {
    verticalAlign: "middle"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3)
    }
  }
}))

const Checkout = () => {
  const classes = useStyles()
  return (
    <Layout>
      <CssBaseline />
      <Toolbar />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <ThemeProvider theme={theme}>
            <StepForm />
          </ThemeProvider>
        </Paper>
      </main>
    </Layout>
  )
}

export default Checkout
