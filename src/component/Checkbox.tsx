import styled from 'styled-components'
import handleTextOverflow from '../internal/handleTextOverflow'
import Label from '../internal/Label'

const StyledCheckbox = styled.div`
  width: 14px;
  height: 14px;

  border: 3px solid darkgray;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 1px 1px 1px 1px black;
`

const EnabledIndicator = styled.div<{ checked: boolean }>`
  width: 8px;
  height: 8px;
  background-color: ${({ checked }) => (checked ? 'darkgray' : 'transparent')};
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;

  margin: 2px 0;
`

const Checkbox = ({
  label,
  onClick,
  description,
  checked,
}: {
  label: string
  onClick: (checked: boolean) => void
  description?: string
  checked: boolean
}) => {
  return (
    <CheckboxContainer
      onClick={() => {
        const newValue = !checked
        onClick(newValue)
      }}
      title={description}
    >
      <Label>{label}</Label>
      <StyledCheckbox>
        <EnabledIndicator checked={checked} />
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
