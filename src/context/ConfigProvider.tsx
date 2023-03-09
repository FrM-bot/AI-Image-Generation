import { createContext, useEffect, useReducer } from "react"
import { getLocalStorageValue } from "@/utils/LocalStorage"
import { DispatchGrayScale, ReducerStateGrayScaleConfig, TYPE_DISPATCH_GRAYSACLE } from "@/interface/Grayscale"
import { reducerGrayscale } from "@/reducers/GrayscaleReducer"
import { reducerDarkmode } from "@/reducers/DarkmodeReducer"
import { DispatchDarkmode, ReducerStateDarkmodeConfig, TYPE_DISPATCH_DARKMODE } from "@/interface/Darkmode"

export const ConfigContext = createContext({ 
    grayscale: true, 
    dispatchGrayScale: ({ type, payload }: { type: DispatchGrayScale, payload: ReducerStateGrayScaleConfig }) => { } ,
    darkmode: true, 
    dispatchDarkmode: ({ type, payload }: { type: DispatchDarkmode, payload: ReducerStateDarkmodeConfig }) => { } ,
})


function ConfigProvider({ children }: { children: JSX.Element }) {
    const initialStateGrayScale = getLocalStorageValue('grayscale')
    const initialStateDarkmode = getLocalStorageValue('darkmode')
    const [{ grayscale }, dispatchGrayScale] = useReducer(reducerGrayscale, { grayscale: true })
    const [{ darkmode }, dispatchDarkmode] = useReducer(reducerDarkmode, { darkmode: true })


    useEffect(() => {
        dispatchGrayScale({ type: TYPE_DISPATCH_GRAYSACLE.SET_VALUE_GRAYSCALE, payload: { grayscale: initialStateGrayScale } })
        dispatchDarkmode({ type: TYPE_DISPATCH_DARKMODE.SET_VALUE_DARKMODE, payload: { darkmode: initialStateDarkmode } })
    }, [])


    return (
        <ConfigContext.Provider value={{ grayscale, dispatchGrayScale, darkmode, dispatchDarkmode }}>
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider