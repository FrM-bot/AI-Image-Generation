import { ImageGenerated } from "@/interface/Image"
import { LOCAL_STORAGE_KEYS } from "@/interface/LocalStarage"
import { getLocalStorageValue } from "@/utils/LocalStorage"
import { useEffect, useState, lazy, Suspense } from "react"
import Card from "./Card"
import Columns from "./Columns"
import useMessage from "./useMessage"

const LocalPicture = lazy(() => import("./LocalPicture"))

function LocalImages() {
    const [allImages, setAllImages] = useState<ImageGenerated[]>([])
    const { Message: MessageWarning } = useMessage({ type: 'warning', initialMessage: 'The images are remove after 5 minutes if you don\'t share.' })
    useEffect(() => {
        const initialState: ImageGenerated[] = getLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGES) ?? []
        setAllImages(initialState)
    }, [])


    return (
        <section>
            <Card>
                <h2>My images</h2>
            </Card>

            <MessageWarning />

            <Columns>
                <>
                    {
                        allImages?.map(image => (
                            <Suspense key={image.url}>
                                <LocalPicture url={image.url} prompt={image.prompt} keyLocal='images' />
                            </Suspense>
                        ))
                    }
                </>
            </Columns>
            {
                allImages?.length === 0 &&
                <div className="grid place-content-center w-full my-4">
                    <span>Not images generated</span>
                </div>
            }
        </section>
    )
}

export default LocalImages