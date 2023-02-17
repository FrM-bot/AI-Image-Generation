// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../config/prisma"
import { uploadImgToCloudinary } from '@/config/cloudinary'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { url, prompt } = req.body

  const { name } = path.parse(url?.split('/')[6]?.split('?')[0] || '')

  if (!name) {
    return res.send({ error: 'Error to save image.' })
  }

  const existFile = await db.images.count({
    where: {
      name
    }
  })

  if (existFile > 0) {
    return res.status(200).json({ message: 'This image already shared' })
  }

  const { img } = await uploadImgToCloudinary(url)

  if (img) {
    const dataSaved = await db.images.create({
      data: {
        url: img.secure_url,
        name,
        prompt
      }
    })
    res.status(200).json({ data: dataSaved })
  }
}
