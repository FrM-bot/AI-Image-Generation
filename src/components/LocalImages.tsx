import { ImageGenerated } from "@/interface/Image"
import { LOCAL_STORAGE_KEYS } from "@/interface/LocalStarage"
import { getLocalValue } from "@/utils/LocalStorage"
import { useEffect, useState } from "react"
import Card from "./Card"
import ImagesToShare from "./ImagesToShare"
import useMessage from "./useMessage"

function LocalImages() {
    const initialState = getLocalValue(LOCAL_STORAGE_KEYS.IMAGES)
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
                <ImagesToShare numberOfCards={6} imagesGenerated={allImages} isLastGenerated={false} />
            </div>
        </section>
    )
}

export default LocalImages