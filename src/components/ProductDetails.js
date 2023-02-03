import React, { useState } from "react"
import Layout from "./Layout"
import {
  Grid,
  Segment,
  Divider,
  Accordion,
  Icon,
  Placeholder,
  Label,
} from "semantic-ui-react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"
import { addItem } from "src/helpers/cartHelpers"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import history from "src/history"
import CardMedia from "@material-ui/core/CardMedia"

import "src/styles/App.css"
import SearchBar from "src/components/Search"
import {
  useProductImage,
  useProductDetails,
  useRelatedProducts,
} from "src/hooks"

const useStyles = makeStyles({
  unitStyle: {
    background: "white",
    padding: ".5rem",
    border: "2px solid green",
  },
  media: {
    paddingTop: "86.25%",
  },

  Placeholder: {
    transform: "skew(-5deg, -5deg)",
    height: "40px",
    marginBottom: "35px",
  },
})

const ProductDetails = (props) => {
  const classes = useStyles()
  const [activeIndex, setActiveIndex] = useState(0)

  const productQuery = useProductDetails({ productId: props.match.params.id })
  const imageQuery = useProductImage({ productId: props.match.params.id })
  const relatedProductQuery = useRelatedProducts({
    productId: productQuery.data?._id,
  })

  const renderProductImage = () => {
    if (imageQuery.isLoading) return <div>Loading...</div>
    return (
      <div>
        {imageQuery.isFetching ? (
          <Placeholder fluid>
            <Placeholder.Image rectangular />
          </Placeholder>
        ) : (
          <div>
            <Label
              as="a"
              color="red"
              ribbon="right"
              style={{ top: "48px", zIndex: "1" }}
            >
              In Stock
            </Label>
            <CardMedia className={classes.media} image={imageQuery.data} />
          </div>
        )}
      </div>
    )
  }

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  const addtocart = (product) => {
    addItem(product, () => {})
  }

  const renderProductDetails = () => {
    if (productQuery.isLoading) return <div>Loading...</div>
    return (
      <div>
        {productQuery.isFetching ? (
          <Placeholder className={classes.Placeholder}>
            <Placeholder.Header></Placeholder.Header>
          </Placeholder>
        ) : (
          <Typography className="product_detail_title">
            {productQuery.data?.title}
          </Typography>
        )}

        <div style={{ marginBottom: "2rem" }}>
          <div style={{ marginBottom: "22px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography className="detailTextStyle">Product MRP:</Typography>

              <Typography className="detailPrice">
                &nbsp;₹{productQuery.data?.price}
              </Typography>
            </div>
            <span>(Inclusive of all taxes)</span>
          </div>
          <div style={{ marginBottom: "40px" }}>
            <Typography className={classes.textStyle}>Available in:</Typography>
            <button className={classes.unitStyle}>
              {productQuery.data?.quantity} units
            </button>
          </div>
          <div>
            {productQuery.isFetching ? (
              <Placeholder style={{ height: 60, width: 230 }}>
                <Placeholder.Image />
              </Placeholder>
            ) : (
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Button
                  disabled={!productQuery.data?.price}
                  className="cardBtn"
                  onClick={() => addtocart(productQuery.data)}
                >
                  'Add to cart'
                </Button>
              </Link>
            )}
          </div>
        </div>

        <Typography className="subheading">Product Details</Typography>
        <Divider />
        <div>
          <div>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Product Desciption
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                {productQuery.isFetching ? (
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                ) : (
                  <>{productQuery.data?.description}</>
                )}
              </Accordion.Content>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Nutrient Values
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                {productQuery.isFetching ? (
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                ) : (
                  <>{productQuery.data?.nutrientValues}</>
                )}
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <CssBaseline />
      <Toolbar />
      <div className="project_detail">
        <div className="search_wrap">
          <SearchBar />
        </div>
        <div>
          <ArrowBackIcon className="backBtn" onClick={() => history.goBack()} />
        </div>
        <Grid stackable columns={2}>
          <Grid.Column>{renderProductImage()}</Grid.Column>
          <Grid.Column style={{ padding: "3rem" }}>
            {renderProductDetails()}
          </Grid.Column>
        </Grid>
        <section>
          <Toolbar />
          <Typography className={classes.subHeading}>
            Similar Products
          </Typography>
          <Divider />
          {relatedProductQuery.fetchStatus === "idle" &&
          relatedProductQuery.isLoading ? null : relatedProductQuery.isLoading ? (
            <Segment loading style={{ border: "none", height: "80vh" }} />
          ) : (
            <Grid doubling columns={4}>
              {relatedProductQuery.data.map((product, i) => {
                return (
                  <Grid.Column key={i}>
                    <Link
                      to={`/product/details/${productQuery.data?._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ProductCard product={product} />
                    </Link>
                  </Grid.Column>
                )
              })}
            </Grid>
          )}
        </section>
      </div>
    </Layout>
  )
}

export default ProductDetails
