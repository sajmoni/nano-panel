import styled from 'styled-components'

const SNACKBAR_WIDTH = 300

const SnackbarContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: visible;

  background-color: red;
  border-radius: 8px;
  padding: 0px 16px;

  top: 10px;
  left: calc(50vw - ${SNACKBAR_WIDTH / 2}px);
  width: ${SNACKBAR_WIDTH}px;
  height: 40px;

  font-size: 14px;
  /* TODO: Cut off text when too long */
`

type SnackbarProps = {
  value: string
  onClose: () => void
  isOpen: boolean
}

const CloseButton = styled.div`
  margin-left: auto;
  cursor: pointer;

  padding: 2px 6px;
  border-radius: 4px;

  :hover {
    background-color: lightgray;
  }
`

// TODO: Warn, error or info
const Snackbar = ({ value, onClose, isOpen }: SnackbarProps) => {
  return isOpen ? (
    <SnackbarContainer>
      <div>{value}</div>
      <CloseButton onClick={onClose}>X</CloseButton>
    </SnackbarContainer>
  ) : null
}

export default Snackbar
