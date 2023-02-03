import { useQuery } from "@tanstack/react-query"
import { getProductImage } from "src/apis/getProduct"

export const useProductImage = ({ productId }) => {
  return useQuery(["productimage", productId], getProductImage, {
    enabled: !!productId,
  })
}
