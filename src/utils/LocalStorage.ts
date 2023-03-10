import { KeysLovalValue } from "@/interface/LocalStarage"


export const getLocalStorageValue = (key: KeysLovalValue) => {
    try {
        const stringifyLocalValue = globalThis?.window?.localStorage?.getItem(key) || 'null'
        const value = globalThis?.window?.JSON?.parse(stringifyLocalValue)
        return value
    } catch (error) {
        console.error(error)
    }
}

export const setLocalStorageValue = (key: KeysLovalValue, value: unknown) => {
    globalThis?.window?.localStorage?.setItem(key, globalThis?.window?.JSON.stringify(value))
}