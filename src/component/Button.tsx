import styled from 'styled-components'

const StyledButton = styled.button`
  cursor: pointer;

  width: max-content;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 2px 0;

  font-size: 12px;
`

const Button = ({
  label,
  onClick,
  description,
}: {
  label: string
  onClick: () => void
  description?: string
}) => {
  return (
    <StyledButton onClick={onClick} title={description}>
      {label}
    </StyledButton>
  )
}

export default Button
