import type { FormEvent, ReactElement } from 'react'

interface Props {
    children: ReactElement
    onSubmit: (e: any) => void
    className?: string
}

const Form = ({ children, onSubmit: handlerSubmit, className }: Props) => {

    const onSobmit = (e: FormEvent<HTMLFormElement>): { [k: string]: FormDataEntryValue } => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))
        return data
    }

    return (
        <form onSubmit={(e) => handlerSubmit(onSobmit(e))} className={className}>
            {children}
        </form>
    )

}

export default Form
