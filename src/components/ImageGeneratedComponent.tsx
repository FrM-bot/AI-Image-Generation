import { ImageGenerated } from '@/interface/Image'
import Card from './Card'
import ImagesToShare from './ImagesToShare'
interface Props {
    imagesGenerated: ImageGenerated[]
}

function ImageGeneratedComponent({ imagesGenerated }: Props) {

    return (
        <>
            <Card>
                <h2>Images generated</h2>
            </Card>
            <div className='flex justify-center items-start gap-4'>
                <ImagesToShare numberOfCards={1} imagesGenerated={imagesGenerated} isLastGenerated={true} />
            </div>
        </>
    )
}

export default ImageGeneratedComponent