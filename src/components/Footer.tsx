import Link from "./Link"
import Text from "./Text"

function Footer() {
    return (
        <footer className='max-w-7xl mx-auto flex items-center rounded-md justify-between bg-white/50 dark:bg-[#161618ac] p-2 border-[3px] dark:border-zinc-800 backdrop-blur-[2px] mb-2'>
            <div className='flex justify-between w-full items-center'>
                <Link type='External' href='https://frm-bot.xyz'>Frm-Bot</Link>
                <Text variant="Gradient">damianmaciel0@gmail.com</Text>

            </div>
        </footer>
    )
}

export default Footer