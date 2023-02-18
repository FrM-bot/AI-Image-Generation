import type { FC, ReactElement } from 'react'
import { classNamesJoin } from '@/utils/className'

interface Props {
  children: string | ReactElement
  className?: string
  variant?: 'Gradient'
}

const Text: FC<Props> = ({ children, className, variant }) => {
  if (variant === 'Gradient') {
    return (
      <span className={classNamesJoin(className ?? '', 'bg-clip-text text-[#fff0] bg-gradient-to-l from-custom-pink to-custom-cyan')}>{children}</span>
    )
  }
  return (
    <span className={classNamesJoin(className ?? '', 'after:absolute after:bg-gradient-to-l after:from-custom-pink after:to-custom-cyan after:w-full after:h-px after:duration-300 after:bottom-0 after:left-0 relative after:rounded-md after:shadow-lg py-1 px-2 w-fit whitespace-nowrap')}>{children}</span>
  )
}

export default Text