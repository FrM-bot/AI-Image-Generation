import IconLoader from '@/icons/IconLoader'
import type { ButtonHTMLAttributes, ReactElement } from 'react'
interface Props {
    children: ReactElement | string
    props?: ButtonHTMLAttributes<HTMLButtonElement>
    isLoading?: boolean
}

function Button({ props, children, isLoading }: Props) {
    return (
        <button
            className="dark:bg-custom-dark bg-white rounded py-[0.4em] px-[.8em] border-[3px] dark:border-zinc-800 dark:text-white hover:shadow-lg shadow-black/20 duration-300"
            {...props}
        >
            {
                isLoading ?
                    <span className='flex items-center gap-1'>
                        <IconLoader />
                        Loading...
                    </span>
                    :
                    <>
                        {children}
                    </>
            }
        </button>
    )
}

export default Button