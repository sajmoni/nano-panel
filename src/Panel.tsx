import { type ReactNode, useEffect, useState } from 'react'
import { createStoredValue } from 'typed-ls'
import styled, { css } from 'styled-components'
import Color from './internal/color'
import { Resizable } from 're-resizable'
import { LockClosedIcon, LockOpenIcon } from './icon'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`

const OuterContainer = styled.div<{ $isMinimized: boolean }>`
  position: absolute;
  top: 0px;
  height: ${({ $isMinimized }) => ($isMinimized ? 'auto' : '100%')};
  z-index: 9999;
`

const StyledContainer = styled.div`
  box-sizing: border-box;
  padding: 5px;

  background-color: ${Color.GREEN_DARK};
  opacity: 0.8;

  color: white;
  font-family: Helvetica;
  font-size: 12px;

  display: flex;
  flex-direction: column;

  z-index: 100;

  height: 100%;
`

const MinimizeButton = styled.button`
  align-self: flex-start;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
`

const LockButton = styled.div<{ $isVisible: boolean }>`
  ${({ $isVisible }) => setVisibility($isVisible)}
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

const setVisibility = (isVisible: boolean) =>
  isVisible
    ? 'visibility: visible;'
    : css`
        visibility: hidden;
        width: 0;
        height: 0;
      `

const ChildrenContainer = styled.div<{ $isVisible: boolean }>`
  ${({ $isVisible }) => setVisibility($isVisible)}
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
`

const savedMinimized = createStoredValue('minimized', false)
const savedLocked = createStoredValue('locked', true)
// TODO: Use new typed-ls without default?
const savedWidth = createStoredValue('width', 250)

export const Panel = ({
  children, // TODO?
  // defaultWidth = 250,
}: // orientation = 'left',
{
  children: ReactNode
  width?: number
  orientation?: 'left' | 'right'
}) => {
  const [isMinimized, setIsMinimized] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [width, setWidth] = useState(250)

  useEffect(() => {
    // TODO: Better react API for this built into typed-ls?
    setIsMinimized(savedMinimized.get())
    setIsLocked(savedLocked.get())
    setWidth(savedWidth.get())
    setHasLoaded(true)
  }, [])

  return (
    <>
      {!isMinimized && !isLocked ? (
        <Overlay
          onClick={() => {
            setIsMinimized(true)
          }}
        />
      ) : null}
      <OuterContainer
        $isMinimized={isMinimized}
        id='nano-panel'
      >
        <Resizable
          size={{ width: isMinimized ? 'auto' : width, height: '100%' }}
          enable={{
            top: false,
            right: !isMinimized,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          minWidth={150}
          maxWidth={600}
          onResizeStop={(_event, _direction, _ref, d) => {
            const newWidth = width + d.width
            setWidth(newWidth)
            savedWidth.set(newWidth)
          }}
        >
          <StyledContainer>
            {hasLoaded ? (
              <TopRow>
                <MinimizeButton
                  onClick={() => {
                    const newValue = !isMinimized
                    setIsMinimized(newValue)
                    savedMinimized.set(newValue)
                  }}
                >
                  {isMinimized ? 'Show debug' : 'Hide'}
                </MinimizeButton>
                <LockButton
                  onClick={() => {
                    const newValue = !isLocked
                    setIsLocked(newValue)
                    savedLocked.set(newValue)
                  }}
                  $isVisible={!isMinimized}
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
            <ChildrenContainer $isVisible={!isMinimized}>
              {children}
            </ChildrenContainer>
          </StyledContainer>
        </Resizable>
      </OuterContainer>
    </>
  )
}

export default Panel
