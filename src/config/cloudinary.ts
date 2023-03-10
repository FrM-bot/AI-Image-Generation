import { UploadApiOptions, v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export const uploadImgToCloudinary = async (filePath: string, options?: UploadApiOptions) => {
  try {
    const res = await cloudinary.uploader.upload(filePath, { folder: 'ImagesGenerated', ...options })
    return { img: res }
  } catch (error: any | undefined) {
    return { error: error.message }
  }
}
