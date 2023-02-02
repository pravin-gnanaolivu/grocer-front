import * as React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"

import { useTheme } from "@material-ui/core/styles"
import Card from "src/components/ProductCard"

import { Link } from "react-router-dom"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

import { getCategories } from "src/apis/category"

import Checkboxes from "src/components/Checkbox"
import RadioButton from "src/components/RadioButton"
import { price } from "src/components/Price"
import { Dimmer, Loader } from "semantic-ui-react"

import { Grid } from "semantic-ui-react"
import SearchBar from "src/components/Search"
import Layout from "src/components/Layout"

import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import "src/styles/App.css"
import { useQuery } from "@tanstack/react-query"
import { useLandingPageStyles } from "src/components/Home/home.style"
import { getFilteredProducts } from "src/apis/getFilteredProducts"

const Home = () => {
  const classes = useLandingPageStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const [selectedFilters, setSelectedFilters] = React.useState({
    filters: { category: [], price: [] },
  })
  const [limit] = React.useState(100)
  const [skip] = React.useState(0)

  const categoryQuery = useQuery(["categories"], getCategories, {
    cacheTime: Infinity,
  })

  const productQuery = useQuery(
    ["products", { skip, limit, filters: selectedFilters.filters }],
    getFilteredProducts,
    {
      cacheTime: Infinity,
    }
  )

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleFilters = (filter, filterBy) => {
    const newFilter = { ...selectedFilters }
    newFilter.filters[filterBy] = filter
    setSelectedFilters(newFilter)
  }

  const drawer = (
    <div>
      {categoryQuery.isError && <p>Something went wrong</p>}
      {categoryQuery.isLoading ? (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      ) : (
        <div>
          <Hidden smDown>
            <div className={classes.toolbar} />
          </Hidden>
          <Divider />
          <List style={{ paddingTop: "30px" }}>
            <ListItem className={classes.filter}>Filter By Category</ListItem>

            <Checkboxes
              categories={categoryQuery.data}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </List>
          <List>
            <ListItem className={classes.filter}>Filter By Price</ListItem>
            <RadioButton
              price={price}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </List>
        </div>
      )}
    </div>
  )

  return (
    <Layout>
      <div className={classes.root}>
        <CssBaseline />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          className={classes.menuButton}
        >
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
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
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
          {productQuery.isError && <p>Uh Oh! Something went wrong</p>}
          {productQuery.isLoading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <Grid doubling columns={3}>
              {productQuery.data.map((product, idx) => {
                return (
                  <Grid.Column key={idx}>
                    <Link
                      to={`/product/details/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card product={product} />
                    </Link>
                  </Grid.Column>
                )
              })}
            </Grid>
          )}
        </main>
      </div>
    </Layout>
  )
}

export default Home
