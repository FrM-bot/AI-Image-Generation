import Button from '@/components/Button'
import { ConfigContext } from '@/context/ConfigProvider'
import { useContext } from 'react'

function Darkmode() {
    const { darkmode, dispatchDarkmode } = useContext(ConfigContext)
    const handlerDarkmode = () => {
        if (darkmode) {
            dispatchDarkmode({ type: 'DESACTIVE_DARKMODE', payload: { darkmode: false } })
        } else {
            dispatchDarkmode({ type: 'ACTIVE_DARKMODE', payload: { darkmode: true } })

        }
    }
    return (
        <div>
            <Button props={{ onClick: () => handlerDarkmode() }}>
                {
                    darkmode ?
                        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m7.5.5c1.3280962 0 2.5698071.36985953 3.6277499 1.01219586-3.14075981.19184303-5.6277499 2.79938976-5.6277499 5.98780414 0 3.1884144 2.48699009 5.7959611 5.6269199 5.9885898-1.0571128.6415507-2.2988237 1.0114102-3.6269199 1.0114102-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 3)" /></svg>
                        :
                        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(-210 -1)"><g opacity=".3" transform="matrix(.96592583 .25881905 -.25881905 .96592583 214.136029 .477376)"><path d="m9 13c2.2190012 0 4-1.7631416 4-3.98214286 0-2.21900122-1.7809988-4.01785714-4-4.01785714-2.21900123 0-4 1.78099877-4 4 0 2.2190012 1.78099877 4 4 4z" transform="matrix(.96592583 -.25881905 .25881905 .96592583 -2.022704 2.636039)" /><g transform="matrix(.8660254 .5 -.5 .8660254 1.4558 4.066879)"><path d="m0 .5h2" /><path d="m16 .5h2" /></g><g transform="matrix(.96592583 -.25881905 .25881905 .96592583 .17726 10.84642)"><path d="m0 .5h2" /><path d="m16 .5h2" /></g><g transform="matrix(.5 -.8660254 .8660254 .5 4.066879 16.544042)"><path d="m0 .5h2" /><path d="m16 .5h2" /></g><g transform="matrix(-.25881905 -.96592583 .96592583 -.25881905 10.846233 17.822607)"><path d="m0 .5h2" /><path d="m16 .5h2" /></g></g><g><path d="m220.5 2.5v2" /><path d="m227 5-1.5 1.5" /><circle cx="220.5" cy="11.5" r="4" /><path d="m214 5 1.5 1.5" /><path d="m220.5 20.5v-2" /><path d="m227 18-1.5-1.5" /><path d="m214 18 1.5-1.5" /><path d="m211.5 11.5h2" /><path d="m227.5 11.5h2" /></g></g></svg>
                }
            </Button>
        </div>
    )
}

export default Darkmode