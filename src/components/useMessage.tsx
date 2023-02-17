import { ColorCard } from '@/interface/ColorCard'
import { useState } from 'react'
import Card from './Card'

interface Props {
  type: ColorCard
  initialMessage?: string
}

function useMessage({ type, initialMessage }: Props) {
  const [message, setMessage] = useState(initialMessage ?? '')

  const handlerRemoveMessage = () => {
    setMessage('')
  }
  return {
    Message: () => message.length > 0 ? (
    <Card props={{ onClick: () => handlerRemoveMessage(), style: { cursor: 'pointer' } }} color={type}>
      <span>{message}</span>
    </Card>) : null,
    setMessage
  }
}

export default useMessage