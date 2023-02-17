// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai"
import type { NextApiRequest, NextApiResponse } from "next"
import { ImageGenerated } from "@/interface/Image"

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
})
const openai = new OpenAIApi(configuration)

type Response = {
  data?: ImageGenerated[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { prompt } = req.body
  if (prompt?.lengt === 0 || !prompt) {
    res.send({ error: "Not prompt provider" })
  }
  const response = await openai.createImage({
    // prompt:
    //   "A dream of a distant galaxy, by Caspar David Friedrich, trending on artstation HQ",
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "url",
  })
  const data: { url: string, prompt: string }[] = response.data.data.map(({ url }) => ({
    url: url ?? "",
    prompt
  }))

  res.status(200).json({ data })
}
