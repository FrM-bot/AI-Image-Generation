import {
  DispatchDarkmode,
  ReducerStateDarkmodeConfig,
  TYPE_DISPATCH_DARKMODE,
} from "@/interface/Darkmode"
import { setLocalStorageValue } from "@/utils/LocalStorage"

export function reducerDarkmode(
  state: ReducerStateDarkmodeConfig,
  action: { type: DispatchDarkmode; payload: ReducerStateDarkmodeConfig }
) {
  switch (action.type) {
    case TYPE_DISPATCH_DARKMODE.ACTIVE_DARKMODE:
      setLocalStorageValue("darkmode", true)
      document.documentElement.setAttribute("data-theme", "dark")
      return { darkmode: true }
    case TYPE_DISPATCH_DARKMODE.DESACTIVE_DARKMODE:
      setLocalStorageValue("darkmode", false)
      document.documentElement.setAttribute("data-theme", "ligth")

      return { darkmode: false }
    case TYPE_DISPATCH_DARKMODE.SET_VALUE_DARKMODE:
      setLocalStorageValue("darkmode", action.payload.darkmode)
      if (action.payload.darkmode) {
        document.documentElement.setAttribute("data-theme", "dark")
      } else {
        document.documentElement.setAttribute("data-theme", "ligth")
      }
      return { darkmode: action.payload.darkmode }
    default:
      throw new Error()
  }
}
