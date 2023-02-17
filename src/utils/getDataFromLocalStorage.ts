import { ImageGenerated } from "@/interface/Image"

export const getDataFromLocalStorage = (): ImageGenerated[] => {
  const data = JSON.parse(
    globalThis?.window?.localStorage.getItem("images") ?? "[]"
  )
  return data
}
