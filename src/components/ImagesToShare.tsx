import { ConfigContext } from '@/context/ConfigProvider'
import { ImageGenerated } from '@/interface/Image'
import { SaveImage } from '@/services/images'
import { classNamesJoin } from '@/utils/className'
import React, { useContext, useEffect, useState } from 'react'
import Button from './Button'
import Card from './Card'
import Picture from './Picture'
import useImageMaximized from './useImageMaximized'
import useMessage from './useMessage'
interface Props {
    imagesGenerated: ImageGenerated[]
    isLastGenerated: boolean
}

function ImagesToShare({ imagesGenerated, isLastGenerated }: Props) {
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
            console.log(response)
            if (response?.error) {
                setMessage(response.error)
            }
            if (response?.message) {
                setMessageWarning(response.message)
            }
        }).catch(console.error).finally(() => setIsLoading(false))
    }

    const errorLoadImage = (urlError: string) => {
        console.log(urlError)
        if (imagesToShare.length > 0) {
            const newImages = imagesToShare.filter(({ url }) => urlError !== url)
            setImagesToShare(newImages)
            if (isLastGenerated) {
                localStorage.setItem('lastImagesGenerated', JSON.stringify(newImages))
            } else {
                localStorage.setItem('images', JSON.stringify(newImages))
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
                        <div role="status" className="rounded shadow max-w-2xl w-full h-[40vh] animate-pulse inline-block my-3">
                            <div className="flex items-center bg-white justify-center h-full mb-4 rounded dark:bg-custom-dark border-[3px] dark:border-zinc-800">
                                <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                        </div>
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