import { API } from "../config";

export const getFilteredProducts = ({ queryKey }) => {
  const [_, filters] = queryKey;
  return fetch(`${API}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw new Error("something went wrong", err);
    });
};
