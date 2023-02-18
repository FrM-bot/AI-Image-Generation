import Button from '@/components/Button'
import { ConfigContext } from '@/context/ConfigProvider'
import IconMoon from '@/icons/IconMoon'
import IconSun from '@/icons/IconSun'
import { useContext } from 'react'

import { TYPE_DISPATCH_DARKMODE } from '@/interface/Darkmode'

function Darkmode() {
    const { darkmode, dispatchDarkmode } = useContext(ConfigContext)
    const handlerDarkmode = () => {
        if (darkmode) {
            dispatchDarkmode({ type: TYPE_DISPATCH_DARKMODE.DESACTIVE_DARKMODE, payload: { darkmode: false } })
        } else {
            dispatchDarkmode({ type: TYPE_DISPATCH_DARKMODE.ACTIVE_DARKMODE, payload: { darkmode: true } })

        }
    }
    return (
        <div>
            <Button props={{ onClick: () => handlerDarkmode() }}>
                {
                    darkmode ?
                    <IconMoon />
                        :
                    <IconSun />
                }
            </Button>
        </div>
    )
}

export default Darkmode