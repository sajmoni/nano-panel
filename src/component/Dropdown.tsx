import { useState } from 'react'
import styled from 'styled-components'
import Color from '../internal/color'
import handleTextOverflow from '../internal/handleTextOverflow'
import Label from '../internal/Label'

type DropdownItem<T> = {
  label: string
  value: T
}

const DropdownContainer = styled.div`
  display: flex;
  align-items: flex-start;

  margin: 3px 0;

  z-index: 1;

  background-color: ${Color.GREEN_DARK};
`

const StyledDropdownItem = styled.div<{ $bold: boolean }>`
  cursor: pointer;
  margin: 2px;

  ${({ $bold }) => ($bold ? 'font-weight: bold;' : undefined)}
  &:hover {
    opacity: 0.5;
  }

  ${handleTextOverflow};
`

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  border-top: 5px solid white;
`

const SelectedDropdownValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  padding: 3px;

  border: 1px solid white;
  border-radius: 4px;

  box-shadow: 1px 1px 1px 1px black;
`

const DropdownItemsContainer = styled.div`
  border: 1px solid white;
  border-radius: 4px;

  position: absolute;
  width: 35%;

  z-index: 1;

  background-color: ${Color.GREEN_DARK};
`

const StyledDropdown = styled.div`
  width: 35%;
`

const SelectedDropdownValueText = styled.div`
  ${handleTextOverflow};
`

type DropdownProps<T> = {
  items: DropdownItem<T>[]
  value: T | undefined
  onChange: (value: T) => void
  label: string
  description?: string
}

const Dropdown = <T extends string | number>({
  items,
  onChange,
  value,
  label,
  description,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownContainer>
      <Label title={description}>{label}</Label>
      <StyledDropdown>
        <SelectedDropdownValue
          onClick={() => {
            setOpen(!open)
          }}
        >
          <SelectedDropdownValueText>
            {items.find((item) => item.value === value)?.label ?? '-'}
          </SelectedDropdownValueText>
          <ArrowDown />
        </SelectedDropdownValue>

        {open ? (
          <DropdownItemsContainer>
            {items.map((item) => {
              return (
                <StyledDropdownItem
                  $bold={item.value === value}
                  key={item.value}
                  onClick={() => {
                    onChange(item.value as T)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </StyledDropdownItem>
              )
            })}
          </DropdownItemsContainer>
        ) : null}
      </StyledDropdown>
    </DropdownContainer>
  )
}

export default Dropdown
