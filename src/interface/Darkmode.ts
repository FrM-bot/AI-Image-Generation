export const enum TYPE_DISPATCH_DARKMODE {
    ACTIVE_DARKMODE = 'ACTIVE_DARKMODE',
    DESACTIVE_DARKMODE = 'DESACTIVE_DARKMODE',
    SET_VALUE_DARKMODE = 'SET_VALUE_DARKMODE'
}

export type DispatchDarkmode = 'ACTIVE_DARKMODE' | 'DESACTIVE_DARKMODE' | 'SET_VALUE_DARKMODE'

export type ReducerStateDarkmodeConfig = {
    darkmode: boolean
}