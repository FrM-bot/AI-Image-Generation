// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai"
import type { NextApiRequest, NextApiResponse } from "next"
import { ImageGenerated } from "@/interface/Image"
import { DataToGenerate } from "@/services/openai"

type Response = {
  data?: ImageGenerated[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    try {
      const { prompt, apiKey } = req.body as DataToGenerate
      console.log(apiKey)
      const configuration = new Configuration({
        apiKey: apiKey ?? process.env.OPEN_AI_API_KEY,
      })
      const openai = new OpenAIApi(configuration)
      if (!prompt) {
        res.send({ error: "Not prompt provider" })
      }
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url",
      })
      console.log({ prompt }, "data", response.data)
      const data: { url: string; prompt: string }[] = response.data.data.map(
        ({ url }) => ({
          url: url ?? "",
          prompt,
        })
      )
      res.status(200).json({ data })
    } catch (error: any) {
      res.status(500).json({
        error: error.response.data.error.message,
      })
    }
  }
}
