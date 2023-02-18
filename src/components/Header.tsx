import IconOpenAI from '@/icons/IconOpenAI'
import Darkmode from './Darkmode'
import Link from './Link'

function Header() {
    return (
        <header className='flex items-center rounded-md justify-between max-w-7xl mx-auto sticky top-4 z-10 bg-white/50 dark:bg-[#161618ac] p-2 border-[3px] dark:border-zinc-800 backdrop-blur-[2px]'>
            <Link href='/'>
                <h1 className='flex gap-1 items-center'>
                    <IconOpenAI />
                    <span className='font-bold'>
                        OpenAI
                    </span>
                </h1>
            </Link>
            <div className='flex gap-2 items-center'>
                <Link href='/showcase'>
                    Showcase
                </Link>
                <Darkmode />
            </div>

        </header>
    )
}

export default Header