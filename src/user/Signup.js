import React, { useState, useEffect } from "react"
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
import { signup } from "../auth"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import history from ".././history"
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
    // boxShadow: "0 8px 40px -12px rgb(114 226 115)",
    // "&:hover": {
    //   boxShadow: "0 16px 70px -12.125px rgb(114 226 115)"
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
    backgroundImage: "linear-gradient(to right, #9be15d, #00e3ae)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    borderRadius: "0 !important",
    color: "transparent",
    fontFamily: "sans-serif",
    fontWeight: "600",

    fontSize: "1.2rem",
  },
  input: {
    width: "80%",
    marginBottom: "3rem",
  },
})

//`````````````````````````````````COMPONENT STARTS HERE```````````````````````````````
const Signup = () => {
  const classes = useStyles()

  // ```````````````````   VALIDATION WITH REACT MATERIAL LIBRARY````````````````````````
  useEffect(() => {
    ValidatorForm.addValidationRule("nameRule", (value) => {
      if (value.length > 6) {
        return true
      }
      return false
    })

    ValidatorForm.addValidationRule("isPassword", (value) => {
      if (value.length > 5) {
        return true
      }
      return false
    })
  }, [])

  const [values, setValues] = useState({
    name: "",
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

  const { name, email, password, severity, message } = values

  //`````````````````````````ON SUBMIT HANDLER ````````````````````````````````//

  const onClickSubmit = (event) => {
    event.preventDefault()
    signup({ name, email, password }).then((data) => {
      setOpen(true)
      if (data.error) {
        setValues({ ...values, severity: "error", message: data.error })
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          severity: "success",
          message: "Account Created 😍",
        })
        setTimeout(() => {
          history.push("/signin")
        }, 2000)
        ValidatorForm.removeValidationRule("nameRule")
        ValidatorForm.removeValidationRule("isPassword")
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

  const SignupForm = () => {
    const classes = useStyles()

    return (
      <ValidatorForm onSubmit={onClickSubmit} style={{ textAlign: "center" }}>
        <ThemeProvider theme={theme}>
          <TextValidator
            className={classes.input}
            label="Name"
            onChange={handleChange("name")}
            name="name"
            value={name}
            validators={["required", "nameRule"]}
            errorMessages={[
              "Name is required",
              "Name length should be greater than 6",
            ]}
          />
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
            validators={[
              "required",
              "matchRegexp:^(?=.*\\d)[a-zA-Z\\d]{8,999}$",
            ]}
            errorMessages={[
              "Password is required",
              "Minimum 8 characters with atleast 1 number",
            ]}
          />
        </ThemeProvider>
        <Button type="submit" class="cardBtn">
          Signup
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
              Signup
            </Typography>

            {SignupForm()}
          </CardContent>
        </Card>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  )
}

export default Signup
