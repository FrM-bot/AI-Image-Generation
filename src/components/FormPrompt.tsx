import { ImageGenerated } from "@/interface/Image"
import { getDataFromLocalStorage } from "@/utils/getDataFromLocalStorage"
import { useEffect, useState } from "react"
import { GenerateImage } from "../services/openai"
import Button from "./Button"
import Form from "./Form"
import Input from "./Input"
import LocalImages from "./LocalImages"
import ImagesGeneratedComponent from './ImageGeneratedComponent'
import Config from "./Config"
// { url: 'https://cdn.midjourney.com/9331bf87-a997-4632-b2b0-59b432cf0b24/0_3.png' },
// { url: 'https://cdn.midjourney.com/d0f67afd-01db-4009-bc45-318c200834c3/grid_0.png' },
// { url: 'https://cdn.midjourney.com/ea9200e9-f97c-4442-a9bc-2c5153b887a4/grid_0.png' },
// { url: 'https://cdn.midjourney.com/2c9c653d-f8ca-4ed1-8a92-656cc3770d1e/grid_0.png' },
// { url: 'https://cdn.midjourney.com/097ae2fe-de06-4855-bf21-18289f17c646/grid_0.png' }



function FormPrompt() {
  const [imagesGenerated, setImagesGenerated] = useState<ImageGenerated[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const initialState = JSON.parse(localStorage.getItem('lastImagesGenerated') ?? '[]')
    setImagesGenerated(initialState)
  }, [])
  

  const onSubmit = ({ prompt }: { prompt: string }) => {
    if (prompt.length > 0) {
      setIsLoading(true)
      GenerateImage({ prompt }).then(data => {
        const dataInLocalStorage = getDataFromLocalStorage()
        const dataLocalStorage = [...dataInLocalStorage, ...data]
        localStorage.setItem('images', JSON.stringify(dataLocalStorage))
        localStorage.setItem('lastImagesGenerated', JSON.stringify(data))
        setImagesGenerated(data)
      }).catch(error => alert(error.message))
      .finally(() => setIsLoading(false))
    }
  }



  return (
    <section className="mt-4">
      <Form onSubmit={onSubmit}>
        <div className="flex rounded gap-2 mb-4">
          <Input props={{ name: 'prompt', type: 'text', placeholder: 'Beautiful fantasy landscape, trending on artstation' }} />
          <Button isLoading={isLoading}><span>Generate</span></Button>
        </div>
      </Form>
      <ImagesGeneratedComponent imagesGenerated={imagesGenerated} />
      <LocalImages />
    </section>
  )
}

export default FormPrompt