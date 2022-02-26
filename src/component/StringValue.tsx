import { useState, useEffect } from 'react'
import styled from 'styled-components'
import handleTextOverflow from '../internal/handleTextOverflow'
import useMountedState from '../internal/useMountedState'

const ValueContainer = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;

  margin: 2px 0;
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

const StringValue: React.FC<{
  label: string
  getValue: () => string
  description?: string
  updateInterval?: number
}> = ({ label, getValue, description, updateInterval = 1000 }) => {
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

export default StringValue
