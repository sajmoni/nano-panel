import React, { useEffect, useState, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

import { save, restore } from './storage'
import useMountedState from './useMountedState'

const STORAGE_KEY = 'debug'

enum Color {
  GREEN = '#007546',
}

const ValueContainer = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;
`

const handleTextOverflow = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const StyledLabel = styled.div`
  text-align: right;
  width: 75%;
  margin-right: 5px;
  align-self: flex-end;
  font-size: 12px;

  ${handleTextOverflow};
`

const StyledValue = styled.div`
  font-weight: bold;
  font-size: 14px;

  width: 40px;
  ${handleTextOverflow};
`

const DEFAULT_UPDATE_INTERVAL = 1000

export const NumericValue: React.FC<{
  label: string
  getValue: () => number
  updateInterval?: number
  warnAt?: {
    value: number
    when?: 'above' | 'below'
  }
}> = ({
  label,
  getValue,
  updateInterval = DEFAULT_UPDATE_INTERVAL,
  warnAt: { value: warnAtValue, when = 'above' } = {},
}) => {
  // TODO: Other default value
  const [value, setValue] = useState<number>(-999)
  const isMounted = useMountedState()

  useEffect(() => {
    setValue(getValue())
    setInterval(() => {
      if (isMounted()) {
        setValue(getValue())
      }
    }, updateInterval)
  }, [])

  const getTextColor = () => {
    if (!warnAtValue) {
      return 'lightgray'
    }

    if (when === 'above') {
      if (value >= warnAtValue) {
        return 'red'
      }
    } else if (value <= warnAtValue) {
      return 'red'
    }

    return 'lightgray'
  }

  return (
    <ValueContainer color={getTextColor()}>
      <StyledLabel>{label}</StyledLabel> <StyledValue>{value}</StyledValue>
    </ValueContainer>
  )
}

export const StringValue: React.FC<{
  label: string
  getValue: () => string
  updateInterval?: number
}> = ({ label, getValue, updateInterval = DEFAULT_UPDATE_INTERVAL }) => {
  const [value, setValue] = useState<string>('-')
  const isMounted = useMountedState()

  useEffect(() => {
    setValue(getValue())
    setInterval(() => {
      if (isMounted()) {
        setValue(getValue())
      }
    }, updateInterval)
  }, [])

  return (
    <ValueContainer color={'lightgray'}>
      <StyledLabel>{label}</StyledLabel> <StyledValue>{value}</StyledValue>
    </ValueContainer>
  )
}

const StyledButton = styled.button`
  cursor: pointer;
  display: block;
  font-family: Helvetica;
  font-size: 10px;
  width: 70px;
  align-self: flex-start;
  margin: 2px 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Button: React.FC<{
  label: string
  onClick: () => void
}> = ({ label, onClick }) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>
}

const StyledDivider = styled.div`
  height: 1px;
  background-color: lightgray;
  width: 95%;
  margin: 5px 0;
`

export const Divider: React.FC = () => {
  return <StyledDivider></StyledDivider>
}

const StyledCheckbox = styled.div`
  width: 16px;
  height: 16px;

  border: 4px solid darkgray;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;

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
`

export const Checkbox: React.FC<{
  label: string
  onClick: (checked: boolean) => void
}> = ({ label, onClick }) => {
  const [checked, setChecked] = useState(false)

  return (
    <CheckboxContainer>
      <StyledCheckbox
        onClick={() => {
          const newValue = !checked
          setChecked(newValue)
          onClick(newValue)
        }}
      >
        <EnabledIndicator checked={checked} />
      </StyledCheckbox>
      <div>{label}</div>
    </CheckboxContainer>
  )
}

type DropdownItem = {
  label: string
  value: string | number
}

const DropdownContainer = styled.div`
  margin: 10px 0;
`

const DropdownLabel = styled.div<{
  bold: boolean
}>`
  cursor: pointer;
  ${({ bold }) => (bold ? 'font-weight: bold;' : undefined)}
  &:hover {
    opacity: 0.5;
  }
`

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  border-top: 10px solid gray;
`

const SelectedValue = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
  cursor: pointer;
  padding: 5px;

  border: 2px solid white;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px black;
`

type DropdownProps = {
  items: DropdownItem[]
  initialValue?: string | number
  onChange: (value: string | number) => void
  dropdownLabel?: string
  description?: string
}

export const Dropdown = ({
  items,
  onChange,
  initialValue,
  dropdownLabel,
  description,
}: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(initialValue)

  return (
    <DropdownContainer>
      <div>{dropdownLabel}</div>
      <SelectedValue
        onClick={() => {
          setOpen(!open)
        }}
      >
        {selectedValue ?? '-'}
        <ArrowDown />
      </SelectedValue>
      {open
        ? items.map(({ label, value }) => {
            return (
              <DropdownLabel
                bold={value === selectedValue}
                key={value}
                onClick={() => {
                  onChange(value)
                  setSelectedValue(value)
                  setOpen(false)
                }}
              >
                {label}
              </DropdownLabel>
            )
          })
        : null}
    </DropdownContainer>
  )
}

const StyledInput = styled.input``

const InputContainer = styled.div``

type InputProps = {
  type?: string
  label?: string
  onChange: (value: number | string) => void
  initialValue: number | string
}

export const Input = ({ onChange, initialValue, type, label }: InputProps) => {
  const [value, setValue] = useState(initialValue)

  return (
    <InputContainer>
      {label ? <div>{label}</div> : null}
      <StyledInput
        type={type}
        value={value}
        onChange={({ target: { value } }) => {
          onChange(value)
          setValue(value)
        }}
      />
    </InputContainer>
  )
}

const StyledContainer = styled.div<{ width?: number }>`
  background-color: ${Color.GREEN};
  opacity: 0.8;
  position: absolute;
  top: 0px;
  padding: 4px;
  z-index: 1;
  color: white;
  font-family: Helvetica;
  font-size: 10px;
  user-select: none;
  width: ${({ width = 200 }) => width}px;
  display: flex;
  flex-direction: column;
`

const MinimizeButton = styled.button`
  align-self: flex-start;
`

const Container = ({ children }: { children: ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const restored = restore(STORAGE_KEY)
    if (restored) {
      setIsMinimized(restored.minimized)
    }
  }, [])

  return (
    <StyledContainer width={isMinimized ? 60 : undefined}>
      <MinimizeButton
        onClick={() => {
          setIsMinimized(!isMinimized)
          save(STORAGE_KEY, { minimized: !isMinimized })
        }}
      >
        {isMinimized ? 'Show debug' : 'Hide'}
      </MinimizeButton>
      {isMinimized ? null : children}
    </StyledContainer>
  )
}

const renderPanel = (panel: ReactNode, htmlElement: HTMLElement): void => {
  ReactDOM.render(<Container>{panel}</Container>, htmlElement)
}

export default renderPanel
