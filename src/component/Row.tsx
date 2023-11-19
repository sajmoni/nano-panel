import type { ReactNode } from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

type RowProps = {
  className?: string
  children: ReactNode
}

export default function Row({ className, children }: RowProps) {
  return <Container className={className}>{children}</Container>
}
