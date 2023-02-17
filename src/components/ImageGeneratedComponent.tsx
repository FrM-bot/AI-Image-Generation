import { ImageGenerated } from '@/interface/Image'
import { SaveImage } from '@/services/images'
import React, { useState } from 'react'
import Button from './Button'
import Card from './Card'
import ImagesToShare from './ImagesToShare'
import Picture from './Picture'
import useImageMaximized from './useImageMaximized'
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
                <ImagesToShare imagesGenerated={imagesGenerated} isLastGenerated={true} />
            </div>
        </>
    )
}

export default ImageGeneratedComponent