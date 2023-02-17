import { Image } from "@/interface/Image"

export const SaveImage = async ({ url, prompt }: {
  url: string
  prompt: string
}): Promise<Image & { error?: string, message?: string } | undefined> => {
  try {
    const response = await fetch("/api/saveImage", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ url, prompt }),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (error) {
    throw new Error("ERROR_SAVE_IMAGE")
  }
}

export const GetImages = async (): Promise<Image[]> => {
  try {
    const images = await fetch("/api/images", { cache: 'reload' }).then(response => response.json())
    return images 
  } catch (error) {
    throw new Error("ERROR_GET_IMAGES")
  }
}
