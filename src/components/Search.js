import _ from "lodash"
import React, { Component } from "react"
import { Search, Grid } from "semantic-ui-react"
import { productsListForSearch } from "../apis/allProducts"
import "../styles/App.css"
import { API } from "../config"
import history from "../history"

let source = []
const initialState = { isLoading: false, results: [], value: "", id: "" }

export default class SearchBar extends Component {
  state = initialState

  componentDidMount() {
    productsListForSearch().then(response => {
      if (!response) return <div>Loading...</div>
      response.map(product => {
        source.push({ ...product, image: `${API}/product/image/${product._id}`, description: _.truncate(product.description) })
      })
    })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    history.push(`/product/details/${result._id}`)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results, id } = this.state
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search aligned="left" className="search_input" loading={isLoading} onResultSelect={this.handleResultSelect} onSearchChange={_.debounce(this.handleSearchChange, 100, { loading: true })} results={results} value={value} />
        </Grid.Column>
      </Grid>
    )
  }
}
