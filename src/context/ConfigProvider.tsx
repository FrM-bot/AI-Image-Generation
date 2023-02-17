import { createContext, useEffect, useReducer } from "react";

type DispatchGrayScale = 'ACTIVE_GRAYSCALE' | 'DESACTIVE_GRAYSCALE' | 'SET_VALUE_GRAYSCALE'
type DispatchDarkmode = 'ACTIVE_DARKMODE' | 'DESACTIVE_DARKMODE' | 'SET_VALUE_DARKMODE'

type ReducerStateGrayScaleConfig = {
    grayscale: boolean
}

type ReducerStateDarkmodeConfig = {
    darkmode: boolean
}

export const ConfigContext = createContext({ 
    grayscale: true, 
    dispatchGrayScale: ({ type, payload }: { type: DispatchGrayScale, payload: ReducerStateGrayScaleConfig }) => { } ,
    darkmode: true, 
    dispatchDarkmode: ({ type, payload }: { type: DispatchDarkmode, payload: ReducerStateDarkmodeConfig }) => { } ,
})


export const GRAYSACLE_TYPE_DISPATCH = {
    ACTIVE_GRAYSCALE: 'ACTIVE_GRAYSCALE',
    DESACTIVE_GRAYSCALE: 'DESACTIVE_GRAYSCALE',
    SET_VALUE_GRAYSCALE: 'SET_VALUE_GRAYSCALE'
}


function reducer(state: ReducerStateGrayScaleConfig, action: { type: DispatchGrayScale, payload: ReducerStateGrayScaleConfig }) {
    switch (action.type) {
        case GRAYSACLE_TYPE_DISPATCH.ACTIVE_GRAYSCALE:
            window.localStorage.setItem('grayscale', JSON.stringify(true))
            return { grayscale: true }
        case GRAYSACLE_TYPE_DISPATCH.DESACTIVE_GRAYSCALE:
            window.localStorage.setItem('grayscale', JSON.stringify(false))
            return { grayscale: false }
        case GRAYSACLE_TYPE_DISPATCH.SET_VALUE_GRAYSCALE:
            window.localStorage.setItem('grayscale', JSON.stringify(action.payload.grayscale))
            return { grayscale: action.payload.grayscale }
        default:
            throw new Error();
    }
}


export const DARKMODE_TYPE_DISPATCH = {
    ACTIVE_DARKMODE: 'ACTIVE_DARKMODE',
    DESACTIVE_DARKMODE: 'DESACTIVE_DARKMODE',
    SET_VALUE_DARKMODE: 'SET_VALUE_DARKMODE'
}


function reducerDarkmode(state: ReducerStateDarkmodeConfig, action: { type: DispatchDarkmode, payload: ReducerStateDarkmodeConfig }) {
    switch (action.type) {
        case DARKMODE_TYPE_DISPATCH.ACTIVE_DARKMODE:
            window.localStorage.setItem('darkmode', JSON.stringify(true))
            document.documentElement.setAttribute('data-theme', 'dark')
            return { darkmode: true }
        case DARKMODE_TYPE_DISPATCH.DESACTIVE_DARKMODE:
            window.localStorage.setItem('darkmode', JSON.stringify(false))
            document.documentElement.setAttribute('data-theme', 'ligth')

            return { darkmode: false }
        case DARKMODE_TYPE_DISPATCH.SET_VALUE_DARKMODE:
            window.localStorage.setItem('darkmode', JSON.stringify(action.payload.darkmode))
            if (action.payload.darkmode) {
                document.documentElement.setAttribute('data-theme', 'dark')
            } else {
                document.documentElement.setAttribute('data-theme', 'ligth')
            }
            return { darkmode: action.payload.darkmode }
        default:
            throw new Error();
    }
}

function ConfigProvider({ children }: { children: JSX.Element }) {
    const initialStateGrayScale = globalThis?.window?.localStorage?.getItem('grayscale') === 'true'
    const initialStateDarkmode = globalThis?.window?.localStorage?.getItem('darkmode') === 'true'
    const [{ grayscale }, dispatchGrayScale] = useReducer(reducer, { grayscale: true })
    const [{ darkmode }, dispatchDarkmode] = useReducer(reducerDarkmode, { darkmode: true })


    useEffect(() => {
        dispatchGrayScale({ type: 'SET_VALUE_GRAYSCALE', payload: { grayscale: initialStateGrayScale } })
        dispatchDarkmode({ type: 'SET_VALUE_DARKMODE', payload: { darkmode: initialStateDarkmode } })
    }, [])


    return (
        <ConfigContext.Provider value={{ grayscale, dispatchGrayScale, darkmode, dispatchDarkmode }}>
            {children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider