import { API } from "../config"

export const getProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRelatedProducts = productId => {
  return fetch(`${API}/product/related/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}
