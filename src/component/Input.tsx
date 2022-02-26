import styled from 'styled-components'
import Label from '../internal/Label'

const StyledInput = styled.input`
  width: 35%;
`

const InputContainer = styled.div`
  display: flex;
  margin: 2px 0;
`

type InputProps<T> = {
  type?: string
  description?: string
  label: string
  onChange: (value: T) => void
  value: T
}

const Input = <T extends string | number>({
  onChange,
  value,
  type,
  label,
  description,
}: InputProps<T>) => {
  return (
    <InputContainer>
      <Label title={description}>{label}</Label>
      <StyledInput
        type={type}
        value={value}
        onChange={({ target: { value } }) => {
          onChange(value as T)
        }}
      />
    </InputContainer>
  )
}

export default Input
