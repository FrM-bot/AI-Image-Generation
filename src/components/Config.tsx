import { ConfigContext } from '@/context/ConfigProvider'
import { TYPE_DISPATCH_GRAYSACLE } from '@/interface/Grayscale'
import { useState, useCallback, useContext, useEffect } from 'react'
import Button from './Button'

const Config = () => {
    const { grayscale, dispatchGrayScale } = useContext(ConfigContext)
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    
    const handlerActiveGraySacele = useCallback(() => {
        if (grayscale) {
            dispatchGrayScale({ type: TYPE_DISPATCH_GRAYSACLE.DESACTIVE_GRAYSCALE, payload: { grayscale: false } })
        } else {
            dispatchGrayScale({ type: TYPE_DISPATCH_GRAYSACLE.ACTIVE_GRAYSCALE, payload: { grayscale: true } })

        }
    }, [dispatchGrayScale, grayscale])

    return mounted ? (
        <div className="my-4">
            <Button props={{ onClick: () => handlerActiveGraySacele() }}>
                <>
                    Gray Scale {grayscale ? 'On' : 'Off'}
                </>
            </Button>
        </div>
    ) :
    null
}

export default Config