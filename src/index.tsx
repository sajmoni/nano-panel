import React, { useEffect, useState, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { save, restore } from './storage'
import useMountedState from './useMountedState'

const STORAGE_KEY = 'debug'

const StyledLabel = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const StyledValue = styled.div`
  font-weight: bold;
`

// TODO: Enable controlling this in user land
const UPDATE_INTERVAL = 2000

export const Label: React.FC<{
  label: string
  getData: () => number | string
  warnAt?: {
    value: number
    when?: 'above' | 'below'
  }
}> = ({
  label,
  getData,
  warnAt: { value: warnAtValue, when = 'above' } = {},
}) => {
  const [value, setValue] = useState<number | string>('-')
  const isMounted = useMountedState()

  // Will log warning when minimized
  useEffect(() => {
    setValue(getData())
    setInterval(() => {
      if (isMounted()) {
        setValue(getData())
      }
    }, UPDATE_INTERVAL)
  }, [])

  // TODO: Only do  this for numeric values
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
    <StyledLabel color={getTextColor()}>
      {label}: <StyledValue>{value}</StyledValue>
    </StyledLabel>
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

const StyledCheckbox = styled.div``

export const Checkbox: React.FC<{
  label: string
  onClick: (checked: boolean) => void
}> = () => {
  return <StyledCheckbox></StyledCheckbox>
}

const StyledContainer = styled.div<{ width?: number }>`
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0px;
  padding: 4px;
  z-index: 1;
  color: white;
  font-family: Helvetica;
  font-size: 10px;
  user-select: none;
  min-width: ${({ width = 200 }) => width}px;
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
    <StyledContainer>
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
