import ButtonIcon from "../../assets/button.svg"

export const CountButton = ({ openModal, setOpenModal }) => {
  const handleOnClick = () => {
    setOpenModal(true)
  }

  return (
    <button className="absolute bottom-0 z-[9999] border-none">
      <img
        src={ButtonIcon}
        alt="extensionActivationButton"
        className="h-4 w-4"
        onClick={handleOnClick}
      />
    </button>
  )
}
