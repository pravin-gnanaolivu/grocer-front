import { API } from "../config"

export const allProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const productsListForSearch = () => {
  return fetch(`${API}/products/forSearch`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad fetch request")
      }
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}
