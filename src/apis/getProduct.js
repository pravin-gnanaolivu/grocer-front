import { API } from "../config"

export const getProduct = ({ queryKey }) => {
  const [_, productId] = queryKey
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const getRelatedProducts = ({ queryKey }) => {
  const [_, productId] = queryKey
  return fetch(`${API}/product/related/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const getProductImage = ({ queryKey }) => {
  const [_, productId] = queryKey
  return fetch(`${API}/product/image/${productId}`, {
    method: "GET",
  }).then((response) => {
    return response.url
  })
}
