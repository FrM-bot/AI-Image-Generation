import { useState } from 'react'
import { useModal } from './Modal'

interface Props {
  children?: JSX.Element
}

function useImageMaximized( ) {
  const { Modal, handlerShowModal } = useModal()
  const [imageToMaximize, setimageToMaximize] = useState({ src: '', alt: '' })

  const handlerSetImageToMaximize = (data: { src: string, alt: string }) => {
    setimageToMaximize(data)
    handlerShowModal(true)
  }

  return {
    Modal: ({ children }: Props) =>
      <Modal>
        <div className="flex flex-col items-center gap-4">
          <picture className="p-2 dark:bg-custom-dark bg-white rounded-lg border dark:border-zinc-800">
            <img className="max-h-[80vh] rounded" src={imageToMaximize.src} alt={imageToMaximize.alt} />
          </picture>
          {children}
        </div>
      </Modal>,
      handlerSetImageToMaximize
  }

}

export default useImageMaximized