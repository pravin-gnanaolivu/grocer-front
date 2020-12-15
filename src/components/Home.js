import React, { useEffect, useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Card from "./ProductCard"

import { Link } from "react-router-dom"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

import { getCategories } from "../apis/category"

import Checkboxes from "./Checkbox"
import RadioButton from "./RadioButton"
import { price } from "./Price"
import { getFilteredProducts } from "../apis/getFilteredProducts"
import { Dimmer, Loader } from "semantic-ui-react"

import { Grid } from "semantic-ui-react"
import SearchBar from "./Search"
import Layout from "./Layout"

import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import "../styles/App.css"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: 1400
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    color: "white",
    zIndex: 9999,
    position: "fixed",
    left: "10px",
    top: "5px",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center"
  },
  login: {
    color: "#fff",
    fontSize: "1.2rem"
  },
  link: {
    textDecoration: "none",
    color: "#fff"
  },
  filter: {
    //192b09
    backgroundImage: "linear-gradient(to right, #192b09, #00e3ae)",

    WebkitBackgroundClip: "text",

    // backgroundClip: "text",
    color: "transparent",
    fontSize: "1.1rem",
    backgroundClip: "text"
  }
}))

const Home = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")

  const [filters, setFilters] = useState({
    filters: { category: [], price: [] }
  })
  const [filterError, setFilterError] = useState(false)
  const [limit, setLimit] = useState(100)
  const [skip, setSkip] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [dimmer, setDimmer] = useState(true)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    getCategories().then(data => {
      if (data.error) setError(data)
      else {
        setTimeout(() => {
          setCategories(data)
          setLoading(false)
        }, 2000)
      }
    })

    loadFilteredProducts(skip, limit, filters.filters)

    return () => {}
  }, [])

  const handleFilters = (filter, filterBy) => {
    const newFilter = { ...filters }
    newFilter.filters[filterBy] = filter
    loadFilteredProducts(filters.filters)
    setFilters(newFilter)
  }

  const drawer = (
    <div>
      {!loading ? (
        <div>
          <Hidden smDown>
            <div className={classes.toolbar} />
          </Hidden>
          <Divider />
          <List style={{ paddingTop: "30px" }}>
            <ListItem className={classes.filter}>Filter By Category</ListItem>

            <Checkboxes categories={categories} handleFilters={filters => handleFilters(filters, "category")} />
          </List>
          <List>
            <ListItem className={classes.filter}>Filter By Price</ListItem>
            <RadioButton price={price} handleFilters={filters => handleFilters(filters, "price")} />
          </List>
        </div>
      ) : (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )}
    </div>
  )

  const loadFilteredProducts = filters => {
    getFilteredProducts(skip, limit, filters).then(data => {
      if (data.error) {
        setFilterError(data)
      } else {
        setDimmer(false)
        setFilteredResults(data.data)
      }
    })
  }

  return (
    <Layout>
      <div className={classes.root}>
        <CssBaseline />
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="search_wrap">
            <SearchBar />
          </div>
          <div style={{ marginBottom: "2rem" }} />
          {!dimmer ? (
            <Grid doubling columns={3}>
              {filteredResults.map((product, i) => {
                return (
                  <Grid.Column key={i}>
                    <Link to={`/product/details/${product._id}`} style={{ textDecoration: "none" }}>
                      <Card product={product} />
                    </Link>
                  </Grid.Column>
                )
              })}
            </Grid>
          ) : (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          )}
        </main>
      </div>
    </Layout>
  )
}

export default Home
