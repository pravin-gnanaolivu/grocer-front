import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { getProduct, getRelatedProducts } from "../apis/getProduct"
import { Grid, Dimmer, Loader, Segment, Divider, Accordion, Icon, Placeholder, Label } from "semantic-ui-react"
import { API } from "../config"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"
import { addItem } from "../helpers/cartHelpers"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import history from "../history"
import CardMedia from "@material-ui/core/CardMedia"

import "../styles/App.css"
import SearchBar from "./Search"

const useStyles = makeStyles({
  unitStyle: {
    background: "white",
    padding: ".5rem",
    border: "2px solid green"
  },
  media: {
    paddingTop: "86.25%"
  },

  Placeholder: {
    transform: "skew(-5deg, -5deg)",
    height: "40px",
    marginBottom: "35px"
  }
})

const ProductDetails = props => {
  const classes = useStyles()
  const [product, setProduct] = useState({})
  const [relatedProduct, setRelatedProduct] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [contentLoading, setContenLoading] = useState(true)
  const [buttonValue, setButtonValue] = useState("Add to cart")
  const [dimmer, setDimmer] = useState(true)

  const getProductById = productId => {
    getProduct(productId).then(data => {
      if (data.error) {
        console.log(data)
      } else {
        setProduct(data)
        getRelatedProducts(data._id).then(data => {
          if (data.error) {
            console.log(data)
          } else {
            setDimmer(false)
            setRelatedProduct(data)
          }
        })
      }
    })
  }

  const loadImages = () => {
    setLoading(true)
    setContenLoading(true)
    fetch(`${API}/product/image/${props.match.params.id}`, {
      method: "GET"
    }).then(response => {
      if (response) {
        console.log("image loading")
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    loadImages()

    if (loading) {
      setTimeout(() => {
        setContenLoading(false)
      }, 3000)
    }
  }, [props])

  useEffect(() => {
    const productId = props.match.params.id
    getProductById(productId)
    setTimeout(() => {
      setContenLoading(false)
    }, 3000)
  }, [props])

  // useEffect(() => {
  //   if (getCart().length > 0) {
  //     getCart().map(product => {
  //       if (product._id === props.match.params.id) {
  //         setButtonValue("Go to cart")
  //       }
  //     })
  //   }
  // }, [props])

  const renderProductImage = () => {
    if (!props.match.params.id) return <div>Loading...</div>
    return (
      <div>
        {loading ? (
          <Placeholder fluid>
            <Placeholder.Image rectangular />
          </Placeholder>
        ) : (
          <div>
            <Label as="a" color="red" ribbon="right" style={{ top: "48px", zIndex: "1" }}>
              In Stock
            </Label>
            <CardMedia className={classes.media} image={`${API}/product/image/${props.match.params.id}`} />
            {/* <Image className="detailed_img" src={`${API}/product/image/${props.match.params.id}`} /> */}
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
  ////////////////////////////////

  const addtocart = product => {
    addItem(product, () => {
      setButtonValue("Go to cart")
    })
  }

  const renderProductDetails = () => {
    if (!product) return <div>Loading...</div>
    return (
      <div>
        {contentLoading ? (
          <Placeholder className={classes.Placeholder}>
            <Placeholder.Header></Placeholder.Header>
          </Placeholder>
        ) : (
          <Typography className="product_detail_title">{product.title}</Typography>
        )}

        <div style={{ marginBottom: "2rem" }}>
          <div style={{ marginBottom: "22px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography className="detailTextStyle">Product MRP:</Typography>

              <Typography className="detailPrice">&nbsp;₹{product.price}</Typography>
            </div>
            <span>(Inclusive of all taxes)</span>
          </div>
          <div style={{ marginBottom: "40px" }}>
            <Typography className={classes.textStyle}>Available in:</Typography>
            <button className={classes.unitStyle}>{product.quantity} units</button>
          </div>
          <div>
            {contentLoading ? (
              <Placeholder style={{ height: 60, width: 230 }}>
                <Placeholder.Image />
              </Placeholder>
            ) : (
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Button disabled={!product.price} className="cardBtn" onClick={() => addtocart(product)}>
                  Add to cart
                </Button>
              </Link>
            )}

            {/* {buttonValue === "Go to cart" ? (
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Button className="cardBtn" onClick={() => addtocart(product)}>
                  {buttonValue}
                </Button>
              </Link>
            ) : (
              <Button className="cardBtn" disabled={contentLoading} onClick={() => addtocart(product)}>
                {buttonValue}
              </Button>
            )} */}
          </div>
        </div>

        <Typography className="subheading">Product Details</Typography>
        <Divider />
        <div>
          <div>
            <Accordion>
              <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
                <Icon name="dropdown" />
                Product Desciption
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                {contentLoading ? (
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                ) : (
                  <>{product.description}</>
                )}
              </Accordion.Content>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <Accordion.Title active={activeIndex === 2} index={2} onClick={handleClick}>
                <Icon name="dropdown" />
                Nutrient Values
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                {contentLoading ? (
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                ) : (
                  <>{product.nutrientValues}</>
                )}
              </Accordion.Content>
            </Accordion>
          </div>

          {/* <div>{product.countryOfOrigin}</div> */}
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
          <Grid.Column style={{ padding: "3rem" }}>{renderProductDetails()}</Grid.Column>
        </Grid>
        <section>
          <Toolbar />
          <Typography className={classes.subHeading}>Similar Products</Typography>
          <Divider />
          {!dimmer ? (
            <Grid doubling columns={4}>
              {relatedProduct.map((product, i) => {
                return (
                  <Grid.Column key={i}>
                    <Link to={`/product/details/${product._id}`} style={{ textDecoration: "none" }}>
                      <ProductCard product={product} />
                    </Link>
                  </Grid.Column>
                )
              })}
            </Grid>
          ) : (
            <Segment loading style={{ border: "none", height: "80vh" }} />
          )}
        </section>
      </div>
    </Layout>
  )
}

export default ProductDetails
