import _ from "lodash"
import * as React from "react"
import { Search, Grid } from "semantic-ui-react"
import { productsListForSearch } from "src/apis/allProducts"
import "src/styles/App.css"
import { API } from "src/config"
import history from "src/history"
import { useQuery } from "@tanstack/react-query"
import { useProductImage } from "src/hooks"

export const SearchBar = () => {
  const [filteredProducts, setFilteredProducts] = React.useState({
    loading: false,
    results: [],
    value: "",
  })

  const productQuery = useQuery(
    ["search", filteredProducts],
    productsListForSearch
  )
  const imageQuery = useProductImage({ productId: productQuery.data?._id })

  const handleResultSelect = (e, { result }) => {
    history.push(`/product/details/${result._id}`)
  }

  const handleSearchChange = (e, { value }) => {
    setFilteredProducts((state) => ({ ...state, isLoading: true, value }))

    if (filteredProducts.value.length < 1) return

    const re = new RegExp(_.escapeRegExp(filteredProducts.value), "i")
    const isMatch = (result) => re.test(result.title)

    const alterFilteredProducts = productQuery.data.map((product) => ({
      ...product,
      description: _.truncate(product.description),
      image: `${API}/product/image/${product._id}`,
    }))

    setFilteredProducts((state) => ({
      ...state,
      isLoading: false,
      results: _.filter(alterFilteredProducts, isMatch),
    }))
  }

  const { isLoading, value, results } = filteredProducts

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          aligned="left"
          className="search_input"
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </Grid.Column>
    </Grid>
  )
}

export default SearchBar
