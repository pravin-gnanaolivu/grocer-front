import * as React from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Placeholder } from "semantic-ui-react"
import _ from "lodash"
import { useProductImage } from "src/hooks/useProductImage"

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgb(114 226 115)",
    },
  },
  media: {
    paddingTop: "86.25%",
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
  avatar: {
    display: "inline-block",
    border: "2px solid white",
  },

  Placeholder: {
    transform: "skew(-5deg, -5deg)",
    height: "40px",
    marginTop: "-35px",
  },
})

const ProductCard = ({ product }) => {
  const classes = useStyles()
  const imageQuery = useProductImage({ productId: product._id })

  if (!product)
    return (
      <Typography variant={"p"}>
        Oops! something went wrong. unable to fetch the product with id{" "}
        {product._id}
      </Typography>
    )
  return (
    <Card className={classes.card}>
      {imageQuery.isLoading ? (
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      ) : (
        <CardMedia className={classes.media} image={imageQuery.data} />
      )}
      <CardContent className={classes.content}>
        <Typography className="product_title" variant={"h6"} gutterBottom>
          {product.title}
        </Typography>

        <div>
          <p className="product_description">
            {_.truncate(product.description, {
              length: "80",
            })}
          </p>
        </div>
        <div className="product_price">
          ₹{product.price}
          <span>/{product.unit}</span>
        </div>
      </CardContent>
      <CardActions className="card_actions">
        <Button>
          <div className="view_button">
            <p>View</p>
          </div>
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
