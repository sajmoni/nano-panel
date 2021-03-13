import React, { useEffect, useState, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

import { save, restore } from './storage'
import useMountedState from './useMountedState'

const STORAGE_KEY = 'nano-panel'

enum Color {
  GREEN_DARK = '#173338',
  BLACK = '#000000',
}

const defaultBoxShadow = css`
  box-shadow: 1px 1px 1px 1px black;
`

const defaultComponentMargin = css`
  margin: 2px 0;
`

const ValueContainer = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;

  ${defaultComponentMargin};
`

const handleTextOverflow = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const LABEL_WIDTH = '60%'
const VALUE_WIDTH = '35%'

const StyledLabel = styled.div`
  text-align: right;
  width: ${LABEL_WIDTH};
  margin-right: 5px;
  font-size: 12px;
  align-self: center;

  ${handleTextOverflow};
`

const StyledLabelStringAndNumeric = styled(StyledLabel)`
  align-self: flex-end;
`

const StyledValue = styled.div`
  font-weight: bold;
  font-size: 14px;
  width: ${VALUE_WIDTH};

  ${handleTextOverflow};
`

const DEFAULT_UPDATE_INTERVAL = 1000

export const NumericValue: React.FC<{
  label: string
  getValue: () => number
  updateInterval?: number
  description?: string
  warnAt?: {
    value: number
    when?: 'above' | 'below'
  }
}> = ({
  label,
  getValue,
  description,
  updateInterval = DEFAULT_UPDATE_INTERVAL,
  warnAt: { value: warnAtValue, when = 'above' } = {},
}) => {
  const [value, setValue] = useState<number>(getValue())
  const isMounted = useMountedState()

  useEffect(() => {
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
    <ValueContainer color={getTextColor()} title={description}>
      <StyledLabelStringAndNumeric>{label}</StyledLabelStringAndNumeric>
      <StyledValue>{value}</StyledValue>
    </ValueContainer>
  )
}

export const StringValue: React.FC<{
  label: string
  getValue: () => string
  description?: string
  updateInterval?: number
}> = ({
  label,
  getValue,
  description,
  updateInterval = DEFAULT_UPDATE_INTERVAL,
}) => {
  const [value, setValue] = useState<string>(getValue())
  const isMounted = useMountedState()

  useEffect(() => {
    setInterval(() => {
      if (isMounted()) {
        setValue(getValue())
      }
    }, updateInterval)
  }, [])

  return (
    <ValueContainer color={'lightgray'} title={description}>
      <StyledLabelStringAndNumeric>{label}</StyledLabelStringAndNumeric>
      <StyledValue>{value}</StyledValue>
    </ValueContainer>
  )
}

const StyledButton = styled.button`
  cursor: pointer;

  width: max-content;

  display: flex;
  justify-content: center;
  align-items: center;

  ${defaultComponentMargin};
`

export const Button: React.FC<{
  label: string
  onClick: () => void
  description?: string
}> = ({ label, onClick, description }) => {
  return (
    <StyledButton onClick={onClick} title={description}>
      {label}
    </StyledButton>
  )
}

const StyledDivider = styled.div`
  height: 1px;
  background-color: lightgray;

  ${defaultBoxShadow};
  ${defaultComponentMargin};
`

export const Divider: React.FC = () => {
  return <StyledDivider></StyledDivider>
}

const StyledCheckbox = styled.div`
  width: 14px;
  height: 14px;

  border: 3px solid darkgray;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${defaultBoxShadow};
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

  ${defaultComponentMargin};
`

export const Checkbox: React.FC<{
  label: string
  onClick: (checked: boolean) => void
  description?: string
  checked: boolean
}> = ({ label, onClick, description, checked }) => {
  return (
    <CheckboxContainer
      onClick={() => {
        const newValue = !checked
        onClick(newValue)
      }}
      title={description}
    >
      <StyledLabel>{label}</StyledLabel>
      <StyledCheckbox>
        <EnabledIndicator checked={checked} />
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

type DropdownItem = {
  label: string
  value: string | number
}

const DropdownContainer = styled.div`
  display: flex;

  ${defaultComponentMargin};
`

const DropdownItem = styled.div<{
  bold: boolean
}>`
  cursor: pointer;
  margin: 2px;

  ${({ bold }) => (bold ? 'font-weight: bold;' : undefined)}
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

  ${defaultBoxShadow};
`

const DropdownItemsContainer = styled.div`
  border: 1px solid white;
  border-radius: 4px;
`

const StyledDropdown = styled.div`
  width: ${VALUE_WIDTH};
`

const SelectedDropdownValueText = styled.div`
  ${handleTextOverflow};
`

type DropdownProps = {
  items: DropdownItem[]
  value: string | number
  onChange: (value: string | number) => void
  dropdownLabel?: string
  description?: string
}

export const Dropdown = ({
  items,
  onChange,
  value,
  dropdownLabel,
  description,
}: DropdownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownContainer>
      <StyledLabel title={description}>{dropdownLabel}</StyledLabel>
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
                <DropdownItem
                  bold={item.value === value}
                  key={item.value}
                  onClick={() => {
                    onChange(item.value)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </DropdownItem>
              )
            })}
          </DropdownItemsContainer>
        ) : null}
      </StyledDropdown>
    </DropdownContainer>
  )
}

const StyledInput = styled.input`
  width: ${VALUE_WIDTH};
`

const InputContainer = styled.div`
  display: flex;
  ${defaultComponentMargin};
`

type InputProps = {
  type?: string
  description?: string
  label: string
  onChange: (value: number | string) => void
  value: number | string
}

export const Input = ({
  onChange,
  value,
  type,
  label,
  description,
}: InputProps) => {
  return (
    <InputContainer>
      <StyledLabel title={description}>{label}</StyledLabel>
      <StyledInput
        type={type}
        value={value}
        onChange={({ target: { value } }) => {
          onChange(value)
        }}
      />
    </InputContainer>
  )
}

const SNACKBAR_WIDTH = 300

const SnackbarContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: red;
  border-radius: 8px;

  top: 10px;
  left: calc(50vw - ${SNACKBAR_WIDTH / 2}px);
  width: ${SNACKBAR_WIDTH}px;
  height: 40px;

  font-size: 16px;
  /* TODO: Cut off text when too long */
`

type SnackbarProps = {
  value: string
}

// TODO: Warn, error or info
export const Snackbar = ({ value }: SnackbarProps) => {
  // TODO: Click listener
  return value ? <SnackbarContainer>{value}</SnackbarContainer> : null
}

// === End of components ====

const DEFAULT_WIDTH = 250

const StyledContainer = styled.div<{ width: number; isMinimized: boolean }>`
  box-sizing: border-box;
  width: ${({ width, isMinimized }) => (isMinimized ? 'auto' : `${width}px`)};
  height: ${({ isMinimized }) => (isMinimized ? 'auto' : '100%')};
  position: absolute;
  top: 0px;
  padding: 5px;

  background-color: ${Color.GREEN_DARK};
  opacity: 0.8;

  color: white;
  font-family: Helvetica;
  font-size: 12px;

  display: flex;
  flex-direction: column;

  user-select: none;
`

const MinimizeButton = styled.button`
  align-self: flex-start;
  cursor: pointer;
`

export const Panel = ({
  children,
  width = DEFAULT_WIDTH,
}: {
  children: ReactNode
  width?: number
}) => {
  const [isMinimized, setIsMinimized] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const restored = restore(STORAGE_KEY)
    if (restored) {
      setIsMinimized(restored.minimized)
      setHasLoaded(true)
    } else {
      setIsMinimized(false)
      setHasLoaded(true)
    }
  }, [])

  return (
    <StyledContainer width={width} isMinimized={isMinimized}>
      {hasLoaded ? (
        <MinimizeButton
          onClick={() => {
            setIsMinimized(!isMinimized)
            save(STORAGE_KEY, { minimized: !isMinimized })
          }}
        >
          {isMinimized ? 'Show debug' : 'Hide'}
        </MinimizeButton>
      ) : null}
      {isMinimized ? null : children}
    </StyledContainer>
  )
}

/**
 * Just a simple wrapper around ReactDOM.render
 */
const renderPanel = (
  panel: React.DOMElement<React.DOMAttributes<Element>, Element>,
  htmlElement: HTMLElement,
): void => {
  ReactDOM.render(panel, htmlElement)
}

export default renderPanel
