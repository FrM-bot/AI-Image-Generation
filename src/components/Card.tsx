import { ColorCard } from "@/interface/ColorCard"
import { HTMLAttributes } from "react"

interface Props {
  children: JSX.Element
  color?: ColorCard
  props?: HTMLAttributes<HTMLDivElement>
}

function Card({ children, color, props }: Props) {
  if (color === 'error') {
    return (
      <div className="bg-red-300/10 border-[3px] border-red-500/20 rounded py-[0.4em] px-[.8em] text-red-500 my-4" {...props}>
        {children}
      </div>
    )
  }
  if (color === 'seccess') {
    return (
      <div className="bg-custom-cyan/5 border-[3px] border-custom-cyan/20 rounded py-[0.4em] px-[.8em] text-custom-cyan my-4" {...props}>
        {children}
      </div>
    )
  }
  if (color === 'warning') {
    return (
      <div className="bg-yellow-300/5 border-[3px] border-yellow-500/20 rounded py-[0.4em] px-[.8em] text-yellow-300 my-4" {...props}>
        {children}
      </div>
    )
  }
  return (
    <div className="dark:bg-custom-dark bg-white py-[0.4em] px-[.8em] rounded border-[3px] dark:border-zinc-800 shadow-lg shadow-black/10">
      {
        children
      }
    </div>
  )
}

export default Card