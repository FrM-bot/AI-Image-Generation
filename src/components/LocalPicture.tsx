import { ConfigContext } from "@/context/ConfigProvider"
import { ImageGenerated } from "@/interface/Image"
import { KeyLocalImages, LOCAL_STORAGE_KEYS } from "@/interface/LocalStarage"
import { SaveImage } from "@/services/images"
import { classNamesJoin } from "@/utils/className"
import { getLocalStorageValue, setLocalStorageValue } from "@/utils/LocalStorage"
import { useContext, useState } from "react"
import Button from "./Button"
import useImageMaximized from "./useImageMaximized"
import useMessage from "./useMessage"

interface Props {
  keyLocal: KeyLocalImages
}

function LocalPicture({ prompt, url, keyLocal }: ImageGenerated & Props) {
  const { grayscale } = useContext(ConfigContext)
  const { Modal, handlerSetImageToMaximize } = useImageMaximized()
  const { Message: MessagError, setMessage: setMessageError } = useMessage({ type: 'error' })
  const { Message: MessageWarning, setMessage: setMessageWarning } = useMessage({ type: 'warning' })
  const { Message: MessageSuccess, setMessage: setMessageSuccess } = useMessage({ type: 'seccess' })


  const [isLoading, setIsLoading] = useState(false)


  const showModalPreviewImage = ({ url, prompt }: ImageGenerated) => {
    handlerSetImageToMaximize({ alt: prompt, src: url })
  }
  const errorLoadImage = (urlError: string) => {
    const localImages: ImageGenerated[] | null = getLocalStorageValue(keyLocal)
    if (localImages && localImages?.length > 0) {
      const newImages = localImages.filter(({ url }) => urlError !== url)
      setLocalStorageValue(keyLocal, JSON.stringify(newImages))
    }
  }
  const handlerShare = ({ url, prompt }: ImageGenerated) => {
    setIsLoading(true)
    SaveImage({ url, prompt }).then(response => {
      if (response?.error) {
        return setMessageError(response.error)
      }
      if (response?.message) {
        return setMessageWarning(response.message)
      }
      if (response?.url) {
        setMessageSuccess('Image shared successfully.')
      }
    }).catch(console.error).finally(() => setIsLoading(false))
  }

  return (
    <>
      <picture key={url} className="overflow-hidden inline-block cursor-pointer rounded-md h-fit shadow-lg shadow-black/20 hover:shadow duration-300 my-3 border-[4px] dark:border-zinc-800 dark:hover:border-white">
        <img onError={() => errorLoadImage(url)} onClick={() => showModalPreviewImage({ prompt, url })} loading="lazy" className={classNamesJoin('hover:scale-110 max-h-[80vh] w-full duration-300 rounded', grayscale ? 'grayscale hover:grayscale-0' : '')} src={url} alt={prompt} />
      </picture>
      <Modal>
        <>
          <MessagError />

          <MessageWarning />
          <MessageSuccess />

          <Button isLoading={isLoading} props={{ onClick: () => handlerShare({ url, prompt}) }}>
            Share
          </Button>
        </>
      </Modal>
    </>
  )
}

export default LocalPicture