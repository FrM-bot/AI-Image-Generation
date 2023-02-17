import { AnchorHTMLAttributes, ReactElement } from 'react'
import NextLink from 'next/link'
import { classNamesJoin } from '@/utils/className'

interface PropsLink {
  children: ReactElement | string
  href: string
  className?: string
  type?: 'External' | 'Card'
  props?: AnchorHTMLAttributes<HTMLAnchorElement>
}

const Link = ({ children, href, props, className, type }: PropsLink) => {
  if (type === 'External') {
    return (
      <a href={href} rel='noreferrer' className={classNamesJoin(className ?? '', 'border-[3px] cursor-pointer rounded shadow-lg [letter-spacing:1px;] border-transparent py-[0.4em] px-[0.8em] [background:linear-gradient(to_right,white,white)_padding-box,linear-gradient(to_right,#da62c4,#e5e7eb)_border-box] dark:[background:linear-gradient(to_right,#161618,#161618)_padding-box,linear-gradient(to_right,rgb(39_39_42),#15e8cf)_border-box] hover:shadow-md hover:shadow-[#646cff22] duration-300')}
      target='_blank'
      {...props}>
        {children}
      </a>
    )
  }
  if (type === 'Card') {
    return (
      <NextLink href={href} className={classNamesJoin(className ?? '', 'py-[0.3em] px-[0.3em] after:absolute after:bg-gradient-to-l after:from-[#da62c4] after:to-cyan-400 after:w-full after:rounded after:h-px after:bottom-0 after:left-0 after:scale-x-0 after:duration-300 after:z-[5] grid place-content-center relative w-fit hover:after:scale-x-100 shadow-md border-[1px] border-tertiary rounded bg-primary hover:shadow-cyan-400/5 duration-300')} {...props}>
        {children}
      </NextLink>
    )
  }
  return (
    <NextLink href={href} className={classNamesJoin(className ?? '', 'py-[0.4em] px-[0.8em] after:absolute shadow-lg border-[3px] dark:border-custom-dark-2 rounded bg-white/50 dark:bg-custom-dark/50 hover:shadow-black/30 duration-300')} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
