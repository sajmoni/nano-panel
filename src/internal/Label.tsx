import styled from 'styled-components'
import handleTextOverflow from './handleTextOverflow'

const Label = styled.div`
  text-align: right;
  width: 60%;
  margin-right: 5px;
  font-size: 12px;
  align-self: center;

  ${handleTextOverflow};
`

export default Label
