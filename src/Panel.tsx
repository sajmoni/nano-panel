import { ReactNode, useEffect, useState } from 'react'
import { createCommand } from 'typed-ls'
import styled, { css } from 'styled-components'
import Color from './internal/color'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
`

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

  z-index: 100;
`

const MinimizeButton = styled.button`
  align-self: flex-start;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
`

const LockButton = styled.div<{ isVisible: boolean }>`
  ${({ isVisible }) => setVisibility(isVisible)}
  cursor: pointer;
  user-select: none;
`

const LockContainer = styled.div`
  display: flex;
`

const SvgContainer = styled.div`
  width: 14px;
  height: 14px;
  margin: 0px 4px 0px 12px;
`

const LockClosedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
)

const LockOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
  </svg>
)

const setVisibility = (isVisible: boolean) =>
  isVisible
    ? 'visibility: visible;'
    : css`
        visibility: hidden;
        width: 0;
        height: 0;
      `

const ChildrenContainer = styled.div<{ isVisible: boolean }>`
  ${({ isVisible }) => setVisibility(isVisible)}
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
`

const savedMinimized = createCommand('minimized', false)
const savedLocked = createCommand('locked', true)

export const Panel = ({
  children,
  width = 250,
  orientation = 'left',
}: {
  children: ReactNode
  width?: number
  orientation?: 'left' | 'right'
}) => {
  const [isMinimized, setIsMinimized] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    setIsMinimized(savedMinimized.get())
    setIsLocked(savedLocked.get())
    setHasLoaded(true)
  }, [])

  return (
    <>
      <StyledContainer width={width} isMinimized={isMinimized}>
        {hasLoaded ? (
          <TopRow>
            <MinimizeButton
              onClick={() => {
                setIsMinimized(!isMinimized)
                savedMinimized.set(!isMinimized)
              }}
            >
              {isMinimized ? 'Show debug' : 'Hide'}
            </MinimizeButton>
            <LockButton
              onClick={() => {
                setIsLocked(!isLocked)
                savedLocked.set(!isMinimized)
              }}
              isVisible={!isMinimized}
            >
              <LockContainer>
                {isLocked ? (
                  <>
                    <SvgContainer>
                      <LockClosedIcon />
                    </SvgContainer>
                    <div>Locked</div>
                  </>
                ) : (
                  <>
                    <SvgContainer>
                      <LockOpenIcon />
                    </SvgContainer>
                    <div>Unlocked</div>
                  </>
                )}
              </LockContainer>
            </LockButton>
          </TopRow>
        ) : null}
        <ChildrenContainer isVisible={!isMinimized}>
          {children}
        </ChildrenContainer>
      </StyledContainer>
      {!isMinimized && !isLocked ? (
        <Overlay
          onClick={() => {
            setIsMinimized(true)
          }}
        />
      ) : null}
    </>
  )
}

export default Panel
