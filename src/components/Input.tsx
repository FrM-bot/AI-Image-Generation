import type { InputHTMLAttributes } from 'react'

interface Props {
    props?: InputHTMLAttributes<HTMLInputElement>
}

function Input({ props }: Props) {
    return (
        <div className='bg-gradient-to-r from-cyan-300 to-pink-400 p-[3px] w-full flex items-center rounded shadow-black/10'>
            <input
                className='w-full h-full px-3 py-1 outline-none duration-300 bg-white rounded shadow-lg dark:bg-custom-dark'
                {...props}
            />
        </div>
    )
}

export default Input