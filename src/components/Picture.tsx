import { ConfigContext } from '@/context/ConfigProvider'
import { classNamesJoin } from '@/utils/className'
import { useContext } from 'react'
import useImageMaximized from './useImageMaximized'

function Picture({ alt, src }: { alt: string, src: string }) {
    const { handlerSetImageToMaximize, Modal } = useImageMaximized()

    const { grayscale } = useContext(ConfigContext)

    return (
        <>
            <picture className="overflow-hidden cursor-pointer rounded-md h-fit inline-block shadow-lg shadow-black/20 hover:shadow duration-300 border-[4px] dark:border-zinc-800 dark:hover:border-white">
                <img onClick={() => handlerSetImageToMaximize({ alt, src })} loading="lazy" className={classNamesJoin('hover:scale-110 w-full duration-300 rounded', grayscale ? 'grayscale hover:grayscale-0' : '')} src={src} alt={alt} />
            </picture>
            <Modal />
        </>
    )
}

export default Picture