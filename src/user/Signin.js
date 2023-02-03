import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import Toolbar from "@material-ui/core/Toolbar"

import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {
  ThemeProvider,
  makeStyles,
  createTheme,
} from "@material-ui/core/styles"
import { green } from "@material-ui/core/colors"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import "../styles/App.css"
import { signin, authenticate } from "../auth"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import history from ".././history"
import { CardActions } from "@material-ui/core"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"

const theme = createTheme({
  palette: {
    primary: green,
  },
})

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: "auto",
  },
  margin: {
    margin: theme.spacing(1),
    width: "100%",
  },
  card: {
    maxWidth: 800,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "none !important",
    // "&:hover": {
    //   boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    // }
  },
  content: {
    textAlign: "left",
    position: "relative",
  },

  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },

  product_title: {
    fontFamily: "Megrim",
    backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontWeight: "bold",
    textAlign: "center",
    transform: "skew(-5deg, -5deg)",
    fontSize: "3rem",
    position: "relative",
    width: "10rem",
  },
  actions: {
    justifyContent: "center",
    padding: "1rem 1rem",
  },
  button: {
    backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae)  ",
    WebkitBackgroundClip: "text ",
    backgroundClip: "text ",
    borderRadius: "0 !important",
    color: "transparent ",
    fontFamily: "sans-serif",
    fontWeight: "600 ",

    fontSize: "1.2rem ",
  },
  link: {
    backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    padding: "2px 3px",

    "&:hover": {
      backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
    },
  },

  input: {
    width: "80%",
    marginBottom: "3rem",
  },
})

//`````````````````````````````````COMPONENT STARTS HERE```````````````````````````````
const Signin = () => {
  const classes = useStyles()

  // ```````````````````   VALIDATION WITH REACT MATERIAL LIBRARY````````````````````````

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    severity: "",
    message: "",
  })

  const [open, setOpen] = useState(false)

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const { email, password, severity, message } = values

  //`````````````````````````ON SUBMIT HANDLER ````````````````````````````````//

  const onClickSubmit = (event) => {
    event.preventDefault()
    signin({ email, password }).then((data) => {
      setOpen(true)
      if (data.error) {
        setValues({ ...values, severity: "error", message: data.error })
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            severity: "success",
            message: "successfully signed 😍.",
          })
          setTimeout(() => {
            history.push("/")
          }, 2000)
        })
      }
    })
  }

  //``````````````````````````````````````SNACKBAR HANDLER``````````````````````````````//

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  //```````````````````````````````SIGNUP FORM````````````````````````````````````````````//

  const SigninForm = () => {
    const classes = useStyles()

    return (
      <ValidatorForm onSubmit={onClickSubmit} style={{ textAlign: "center" }}>
        <ThemeProvider theme={theme}>
          <TextValidator
            className={classes.input}
            label="Email"
            onChange={handleChange("email")}
            name="email"
            value={email}
            validators={["required", "isEmail"]}
            errorMessages={["Email is required", "Email is not valid"]}
          />
          <TextValidator
            className={classes.input}
            label="Password"
            type="password"
            onChange={handleChange("password")}
            name="password"
            value={password}
            validators={["required"]}
            errorMessages={["Password is required"]}
          />
        </ThemeProvider>
        <Button class="cardBtn" type="submit">
          Login
        </Button>
      </ValidatorForm>
    )
  }

  return (
    <Layout>
      <div>
        <Toolbar />
        <Toolbar />
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography
              className={classes.product_title}
              variant={"h6"}
              gutterBottom
            >
              login
            </Typography>

            {SigninForm()}
          </CardContent>
          <CardActions>
            <Typography style={{ margin: "auto" }}>
              New Customer?
              <Link to="/signup" className={classes.link}>
                sign up
              </Link>
              here..
            </Typography>
            <div style={{ marginBottom: "30px" }} />
          </CardActions>
        </Card>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} message={severity}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  )
}

export default Signin
