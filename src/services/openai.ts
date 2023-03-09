import { ImageGenerated } from "@/interface/Image"

interface Data {
  data: ImageGenerated[]
  created: number
}

export interface DataToGenerate {
  prompt: string
  apiKey?: string
}

export const GenerateImage = async ({
  prompt,
  apiKey,
}: DataToGenerate): Promise<{ data?: ImageGenerated[]; error?: string }> => {
  try {
    const response = await fetch("/api/openai", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        apiKey,
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    })
    const data = await response.json()
    return data
  } catch (error: any) {
    throw new Error("FETCH_ERROR")
  }
}
