import styled from 'styled-components'
// import handleTextOverflow from '../internal/handleTextOverflow'
import Label from '../internal/Label'

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 14px;
  height: 14px;

  border: 3px solid ${({ checked }) => (checked ? '#efefef' : 'darkgrey')};
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 1px 1px 1px 1px black;
`

const EnabledIndicator = styled.div<{ checked: boolean }>`
  width: 8px;
  height: 8px;
  background-color: ${({ checked }) => (checked ? '#efefef' : 'transparent')};
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
      id={'checkbox'}
      onClick={() => {
        const newValue = !checked
        onClick(newValue)
      }}
      title={description}
    >
      <Label>{label}</Label>
      <StyledCheckbox checked={checked}>
        <EnabledIndicator checked={checked} />
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
