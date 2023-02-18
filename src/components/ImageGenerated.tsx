import { ImageGenerated } from "@/interface/Image"
import { useEffect, useState } from "react"
import { GenerateImage } from "../services/openai"
import Button from "./Button"
import Form from "./Form"
import Input from "./Input"
import LocalImages from "./LocalPictures"
import ImagesGeneratedComponent from './ImageGeneratedComponent'
import { getLocalValue, setLocalValue } from "@/utils/LocalStorage"
import { LOCAL_STORAGE_KEYS } from '@/interface/LocalStarage'
import Text from "./Text"

function ImageGenerated() {
  const [imagesGenerated, setImagesGenerated] = useState<ImageGenerated[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const initialState = getLocalValue(LOCAL_STORAGE_KEYS.LAST_IMAGES_GENERATED)
    setImagesGenerated(initialState)
  }, [])
  

  const onSubmit = ({ prompt }: { prompt: string }) => {
    if (prompt.length > 0) {
      setIsLoading(true)
      GenerateImage({ prompt }).then(data => {
        const dataInLocalStorage = getLocalValue(LOCAL_STORAGE_KEYS.IMAGES)
        const dataLocalStorage = [...dataInLocalStorage, ...data]
        setLocalValue(LOCAL_STORAGE_KEYS.IMAGES, dataLocalStorage)
        setLocalValue(LOCAL_STORAGE_KEYS.LAST_IMAGES_GENERATED, data)
        setImagesGenerated(data)
      }).catch(error => alert(error.message))
      .finally(() => setIsLoading(false))
    }
  }

  return (
    <section className="mt-4">
      <Form onSubmit={onSubmit}>
        <div className="flex rounded gap-2 mb-4">
          <Input props={{ name: 'prompt', type: 'text', placeholder: 'Beautiful fantasy landscape, artstation HQ' }} />
          <Button isLoading={isLoading}><Text variant="Gradient">Generate</Text></Button>
        </div>
      </Form>
      <ImagesGeneratedComponent images={imagesGenerated} />
    </section>
  )
}

export default ImageGenerated