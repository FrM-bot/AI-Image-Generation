import { ImageGenerated } from "@/interface/Image"

interface Data {
  data: ImageGenerated[]
  created: number
}

export const GenerateImage = async ({
  prompt,
}: {
  prompt: string
}): Promise<ImageGenerated[]> => {
  try {
    const { data }: Data = await fetch("/api/openai", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        prompt,
      }),
    }).then((response) => response.json())
    return data
  } catch (error) {
    console.error(error)
    throw new Error("ERROR_GENERATE_IMAGE", { cause: "FETCH" })
  }
}
