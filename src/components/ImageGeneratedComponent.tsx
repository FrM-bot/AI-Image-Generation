import { ImageGenerated } from '@/interface/Image'
import Card from './Card'
import LocalPicture from './LocalPicture'
import SkeletonCards from './SkeletonCards'
interface Props {
    images: ImageGenerated[]
}

function ImageGeneratedComponent({ images }: Props) {
    
    return (
        <>
            <Card>
                <h1>Images generated</h1>
            </Card>
            <div className='flex justify-center items-start gap-4'>
                {
                    images?.length > 0 ?
                    images?.map(image => (
                            <LocalPicture key={image.url} url={image.url} prompt={image.prompt} keyLocal='lastImagesGenerated' />
                        ))
                        :
                        <SkeletonCards numberOfCards={1} />
                }
            </div>
        </>
    )
}

export default ImageGeneratedComponent