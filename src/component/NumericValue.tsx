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

const NumericValue = ({
  label,
  getValue,
  description,
  updateInterval = 1000,
  warnAt: { value: warnAtValue, when = 'above' } = {},
}: {
  label: string
  getValue: () => number
  updateInterval?: number
  description?: string
  warnAt?: {
    value?: number
    when?: 'above' | 'below'
  }
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

export default NumericValue
