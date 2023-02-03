import { useQuery } from "@tanstack/react-query"
import { getProduct } from "src/apis/getProduct"

export const useProductDetails = ({ productId }) => {
  return useQuery(["productDetails", productId], getProduct, {
    enabled: !!productId,
  })
}
