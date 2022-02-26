import styled from 'styled-components'

const StyledDivider = styled.div`
  height: 1px;
  background-color: lightgray;

  box-shadow: 1px 1px 1px 1px black;
  margin: 2px 0;
`

const Divider: React.FC = () => {
  return <StyledDivider />
}

export default Divider
