import { ConfigContext } from "@/context/ConfigProvider"
import { ImageGenerated } from "@/interface/Image"
import { SaveImage } from "@/services/images"
import { classNamesJoin } from "@/utils/className"
import { getDataFromLocalStorage } from "@/utils/getDataFromLocalStorage"
import { useContext, useEffect, useRef, useState } from "react"
import Button from "./Button"
import Card from "./Card"
import ImagesToShare from "./ImagesToShare"
import useImageMaximized from "./useImageMaximized"
import useMessage from "./useMessage"



function LocalImages() {
    const initialState = getDataFromLocalStorage()
    const [allImages, setAllImages] = useState<ImageGenerated[]>([])
    const { Message: MessageWarning } = useMessage({ type: 'warning', initialMessage: 'The images are remove after 5 minutes if you don\'t share.' })
    useEffect(() => {
        setAllImages(initialState)
    }, [])

    return (
        <section>
            <Card>
                <h2>My images</h2>
            </Card>

            <MessageWarning />

            <div className="w-full my-2 sm:columns-3 columns-2">
                {/* {
                    allImages.length > 0 ? allImages.map(image => (
                        <picture key={image.url} className="overflow-hidden cursor-pointer rounded-md h-fit inline-block shadow-lg shadow-black/20 hover:shadow duration-300 mt-3 border-[4px] dark:border-zinc-800 dark:hover:border-white">
                            <img loading="lazy" onError={() => errorLoadImage(image.url)} onClick={() => showModalPreviewImage({ prompt: image.prompt, url: image.url })} className={classNamesJoin('hover:scale-110 w-full duration-300 rounded', grayscale ? 'grayscale hover:grayscale-0' : '')} src={image.url} alt={image.prompt} />
                        </picture>
                    ))
                        :
                        Array.from(Array(6)).map((_, index) => (
                            <div key={index} role="status" className="rounded inline-block shadow max-w-2xl w-full h-[40vh] animate-pulse mt-3">
                                <div className="flex items-center bg-white justify-center h-full mb-4 rounded dark:bg-custom-dark border-[3px] dark:border-zinc-800">
                                    <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                </div>
                            </div>
                        ))
                } */}
                <ImagesToShare imagesGenerated={allImages} isLastGenerated={false} />
            </div>
        </section>
    )
}

export default LocalImages