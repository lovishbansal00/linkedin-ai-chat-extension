import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import Modal from "~features/components/Modal"
import { CountButton } from "~features/CountButton"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/messaging/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
const useMessageBoxButton = (openModal, setOpenModal) => {
  const [isInjected, setIsInjected] = useState(false)

  useEffect(() => {
    const injectButton = () => {
      const messageBox = document.querySelector(".msg-form__contenteditable")
      if (!messageBox) {
        setTimeout(injectButton, 1000) // Retry after 1 second if not found
        return
      }

      const buttonContainer = document.createElement("div")
      buttonContainer.className = "plasmo-count-button-container"
      messageBox.parentElement?.insertBefore(buttonContainer, messageBox)

      const root = document.createElement("div")
      buttonContainer.appendChild(root)

      // const shadowRoot = root.attachShadow({ mode: "open" })

      const style = document.createElement("style")
      style.textContent = `
      .count-button-wrapper {
        position: absolute;
        bottom: 15px;
        right: 12px;
        z-index: 9999;
        width: 30px; 
        height: 30px;
      } `
      root.appendChild(style)

      const buttonWrapper = document.createElement("div")
      buttonWrapper.className = "count-button-wrapper"
      root.appendChild(buttonWrapper)

      createRoot(buttonWrapper).render(
        <CountButton openModal={openModal} setOpenModal={setOpenModal} />
      )
      setIsInjected(true)
    }

    injectButton()

    return () => {
      const container = document.querySelector(".plasmo-count-button-container")
      container?.remove()
    }
  }, [])

  return isInjected
}

const PlasmoOverlay = () => {
  const [openModal, setOpenModal] = useState<any>(false)
  const isButtonInjected = useMessageBoxButton(openModal, setOpenModal)

  return (
    <>
      <div className="hidden">
        {isButtonInjected ? "Button injected" : "Injecting button..."}
      </div>
      {openModal && <Modal showModal={openModal} setShowModal={setOpenModal} />}
    </>
  )
}

export default PlasmoOverlay
