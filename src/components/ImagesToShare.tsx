import { ConfigContext } from '@/context/ConfigProvider'
import { ImageGenerated } from '@/interface/Image'
import { SaveImage } from '@/services/images'
import { classNamesJoin } from '@/utils/className'
import { useContext, useEffect, useState } from 'react'
import Button from './Button'
import useImageMaximized from './useImageMaximized'
import useMessage from './useMessage'
import { setLocalValue } from '@/utils/LocalStorage'
import SkeletonCards from './SkeletonCards'
import { LOCAL_STORAGE_KEYS } from '@/interface/LocalStarage'
interface Props {
    imagesGenerated: ImageGenerated[]
    isLastGenerated: boolean
    numberOfCards: number
}

function ImagesToShare({ imagesGenerated, isLastGenerated, numberOfCards }: Props) {
    const [imagesToShare, setImagesToShare] = useState<ImageGenerated[]>([])
    const { grayscale } = useContext(ConfigContext)

    const { Message, setMessage } = useMessage({ type: 'error' })
    const { Message: MessageWarning, setMessage: setMessageWarning } = useMessage({ type: 'warning' })

    const { Modal, handlerSetImageToMaximize } = useImageMaximized()

    const [imageToShare, setimageToShare] = useState<ImageGenerated>()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setImagesToShare(imagesGenerated)
    }, [imagesGenerated])


    const showModalPreviewImage = ({ url, prompt }: ImageGenerated) => {
        handlerSetImageToMaximize({ alt: prompt, src: url })
        setimageToShare({ prompt, url })
    }

    const handlerShare = ({ url, prompt }: ImageGenerated) => {
        setIsLoading(true)
        SaveImage({ url, prompt }).then(response => {
            if (response?.error) {
                return setMessage(response.error)
            }
            if (response?.message) {
                return setMessageWarning(response.message)
            }

        }).catch(console.error).finally(() => setIsLoading(false))
    }

    const errorLoadImage = (urlError: string) => {
        if (imagesToShare.length > 0) {
            const newImages = imagesToShare.filter(({ url }) => urlError !== url)
            setImagesToShare(newImages)
            if (isLastGenerated) {
                setLocalValue(LOCAL_STORAGE_KEYS.LAST_IMAGES_GENERATED, JSON.stringify(newImages))
            } else {
                setLocalValue(LOCAL_STORAGE_KEYS.IMAGES, JSON.stringify(newImages))
            }
        }
    }

    return (
        <>
            <>
                {
                    imagesToShare?.length > 0 ? imagesToShare.map(({ url, prompt }) => (
                        <picture key={url} className="overflow-hidden inline-block cursor-pointer rounded-md h-fit shadow-lg shadow-black/20 hover:shadow duration-300 my-3 border-[4px] dark:border-zinc-800 dark:hover:border-white">
                            <img onError={() => errorLoadImage(url)} onClick={() => showModalPreviewImage({ prompt, url })} loading="lazy" className={classNamesJoin('hover:scale-110 max-h-[60vh] w-full duration-300 rounded', grayscale ? 'grayscale hover:grayscale-0' : '')} src={url} alt={prompt} />
                        </picture>
                    )) :
                        <SkeletonCards numberOfCards={numberOfCards} />
                }
            </>
            <Modal>
                <>
                    <Message />

                    <MessageWarning />

                    <Button isLoading={isLoading} props={{ onClick: () => imageToShare && handlerShare({ url: imageToShare.url, prompt: imageToShare.prompt }) }}>
                        Share
                    </Button>
                </>
            </Modal>
        </>
    )
}

export default ImagesToShare