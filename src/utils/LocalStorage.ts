import { KeysLovalValue } from "@/interface/LocalStarage"


export const getLocalValue = (key: KeysLovalValue) => {
    const stringifyLocalValue = globalThis?.window?.localStorage?.getItem(key) || ''
    const value = globalThis?.window?.JSON?.parse(stringifyLocalValue)
    return value
}

export const setLocalValue = (key: KeysLovalValue, value: any) => {
    globalThis?.window?.localStorage?.setItem(key, globalThis?.window?.JSON.stringify(value))
}