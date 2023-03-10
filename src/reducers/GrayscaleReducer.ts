import { DispatchGrayScale, ReducerStateGrayScaleConfig, TYPE_DISPATCH_GRAYSACLE } from "@/interface/Grayscale"
import { setLocalStorageValue } from "@/utils/LocalStorage"


export function reducerGrayscale(state: ReducerStateGrayScaleConfig, action: { type: DispatchGrayScale, payload: ReducerStateGrayScaleConfig }) {
    switch (action.type) {
        case TYPE_DISPATCH_GRAYSACLE.ACTIVE_GRAYSCALE:
            setLocalStorageValue("grayscale", true)
            return { grayscale: true }
        case TYPE_DISPATCH_GRAYSACLE.DESACTIVE_GRAYSCALE:
            setLocalStorageValue("grayscale", false)
            return { grayscale: false }
        case TYPE_DISPATCH_GRAYSACLE.SET_VALUE_GRAYSCALE:
            setLocalStorageValue("grayscale", action.payload.grayscale)
            return { grayscale: action.payload.grayscale }
        default:
            throw new Error();
    }
}
