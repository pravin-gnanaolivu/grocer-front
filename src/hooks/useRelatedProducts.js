import { useQuery } from "@tanstack/react-query"
import { getRelatedProducts } from "src/apis/getProduct"

export const useRelatedProducts = ({ productId }) => {
  return useQuery(["relatedProducts", productId], getRelatedProducts, {
    enabled: !!productId,
  })
}
