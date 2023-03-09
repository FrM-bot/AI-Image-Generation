import { ImageGenerated } from "@/interface/Image"
import { ChangeEvent, useEffect, useState } from "react"
import { DataToGenerate, GenerateImage } from "../services/openai"
import Button from "./Button"
import Form from "./Form"
import Input from "./Input"
import LocalImages from "./LocalPictures"
import ImagesGeneratedComponent from './ImageGeneratedComponent'
import { getLocalStorageValue, setLocalStorageValue } from "@/utils/LocalStorage"
import { LOCAL_STORAGE_KEYS } from '@/interface/LocalStarage'
import Text from "./Text"

const OpenEye = () => {
  return (
    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 5)"><path d="m8.5 11c3.1296136 0 5.9629469-1.83333333 8.5-5.5-2.5370531-3.66666667-5.3703864-5.5-8.5-5.5-3.12961358 0-5.96294692 1.83333333-8.5 5.5 2.53705308 3.66666667 5.37038642 5.5 8.5 5.5z" /><path d="m8.5 2c.18463928 0 .36593924.01429736.54285316.04184538-.02850842.148891-.04285316.30184762-.04285316.45815462 0 1.38071187 1.1192881 2.5 2.5 2.5.156307 0 .3092636-.01434474.4576252-.04178957.0280774.17585033.0423748.35715029.0423748.54178957 0 1.93299662-1.5670034 3.5-3.5 3.5-1.93299662 0-3.5-1.56700338-3.5-3.5s1.56700338-3.5 3.5-3.5z" /></g></svg>
  )
}

const OffEye = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 4)"><path d="M4.21098664 2.25927021C2.72674608 3.17424129 1.32308387 4.58781789 0 6.5 2.53705308 10.1666667 5.37038642 12 8.5 12 9.9230893 12 11.2849174 11.6209257 12.5854843 10.8627772M14.173426 9.72269094C15.1532781 8.88149971 16.0954695 7.8072694 17 6.5 14.4629469 2.83333333 11.6296136 1 8.5 1 7.66950473 1 6.85987336 1.1291024 6.0711059 1.38730721" /><line x1="2" x2="15" y2="13.071" /></g></svg>
  )
}

function ImageGenerated() {
  const [imagesGenerated, setImagesGenerated] = useState<ImageGenerated[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)

  useEffect(() => {
    const initialState = getLocalStorageValue(LOCAL_STORAGE_KEYS.LAST_IMAGES_GENERATED) ?? []
    setImagesGenerated(initialState)
  }, [])

  const onSubmit = ({ prompt, apiKey }: DataToGenerate) => {

    if (prompt.length > 0) {
      setIsLoading(true)
      GenerateImage({ prompt, apiKey }).then(({ data, error }) => {
        if (error) return alert(error)

        if (data) {
          const dataInLocalStorage = getLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGES) ?? []
          const dataLocalStorage = [...dataInLocalStorage, ...data]
          setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGES, dataLocalStorage)
          setLocalStorageValue(LOCAL_STORAGE_KEYS.LAST_IMAGES_GENERATED, data)
          setImagesGenerated(data)
        }
      }).catch(error => {
        alert(error.message)
      })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <section className="mt-4">
      <Form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex rounded gap-2 mb-4">

            <Input props={{ name: 'apiKey', type: isShowPassword ? 'text' : 'password', placeholder: 'Try with your api key.', autoComplete: 'cc-name' }} />
            <Button props={{ type: 'button', onClick: () => setIsShowPassword(prevValue => !prevValue) }}>
              {
                isShowPassword ?
                  <OffEye /> :
                  <OpenEye />
              }
            </Button>
          </div>
          <div className="flex rounded gap-2 mb-4">
            <Input props={{ name: 'prompt', type: 'text', placeholder: 'Beautiful fantasy landscape, artstation HQ' }} />
            <Button isLoading={isLoading} props={{ type: 'submit' }}><Text variant="Gradient">Generate</Text></Button>
          </div>
        </div>
      </Form>
      <ImagesGeneratedComponent images={imagesGenerated} />
    </section>
  )
}

export default ImageGenerated