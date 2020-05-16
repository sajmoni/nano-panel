import { save, restore } from './storage'

const STORAGE_KEY = 'debug'
let minimized = false

const createButton = ({
  label,
  onClick,
}: {
  readonly label: string
  readonly onClick?: () => void
}) => {
  const element = document.createElement('button')
  element.innerHTML = label
  if (onClick) {
    element.addEventListener('click', onClick)
  }

  element.style.cursor = 'pointer'
  element.style.display = 'block'
  element.style.fontFamily = 'Helvetica'
  element.style.fontSize = '10px'
  element.style.width = '70px'
  element.style.alignSelf = `flex-start`
  element.style.margin = `2px 0`
  element.style.padding = `0`
  element.style.display = `flex`
  element.style.justifyContent = `center`
  element.style.alignItems = `center`
  return element
}

enum ItemType {
  LABEL = 'label',
  BUTTON = 'button',
  DIVIDER = 'divider',
}

type Item = {
  readonly label: string
  readonly getData: () => number | string
  readonly threshold?: string
  readonly type: ItemType
  readonly onClick: () => void
}

type Options = {
  readonly element?: HTMLElement
  readonly width?: number
}

type render = () => void

// TODO: disable @typescript-eslint/prefer-readonly-parameter-types
export default (items: readonly Item[], options: Options = {}): render => {
  const { element: appendTo = document.body, width = 130 } = options

  const container = document.createElement('div')
  appendTo.append(container)
  container.style.backgroundColor = 'rgba(0,0,0,0.8)'
  container.style.position = 'absolute'
  container.style.top = '0px'
  container.style.padding = '4px'
  container.style.zIndex = '1'
  container.style.color = 'white'
  container.style.fontFamily = 'Helvetica'
  container.style.fontSize = '10px'
  container.style.userSelect = 'none'
  container.style.minWidth = `${width}px`
  container.style.display = `flex`
  container.style.flexDirection = `column`

  const header = createButton({ label: 'Hide debug' })
  header.style.alignSelf = 'flex-start'
  container.append(header)

  const elements = items.map(
    ({ label, getData, threshold, type = 'label', onClick }) => {
      if (type === 'button') {
        const element = createButton({ onClick, label })
        container.append(element)
        return {
          label,
          element,
          type,
        }
      }

      if (type === 'divider') {
        const element = document.createElement('div')
        element.style.height = '1px'
        element.style.backgroundColor = 'lightgray'
        element.style.width = '95%'
        element.style.margin = '5px 0'
        container.append(element)
        return {
          type,
          element,
        }
      }

      const element = document.createElement('div')
      element.style.display = 'flex'

      const labelElement = document.createElement('div')
      labelElement.innerHTML = `${label}: `
      labelElement.style.color = 'lightgray'
      labelElement.style.width = '75%'
      labelElement.style.textAlign = 'right'
      labelElement.style.marginRight = '5px'
      labelElement.style.textOverflow = 'ellipsis'
      labelElement.style.whiteSpace = 'nowrap'
      labelElement.style.overflow = 'hidden'
      element.append(labelElement)

      const valueElement = document.createElement('div')
      valueElement.innerHTML = `${getData() || '-'}`
      valueElement.style.fontWeight = `bold`
      element.append(valueElement)

      container.append(element)

      return {
        label,
        getData,
        element,
        labelElement,
        valueElement,
        threshold,
        type: 'label',
      }
    },
  )

  const renderElements = () => {
    elements.forEach(({ element }) => {
      if (minimized) {
        element.style.display = 'none'
        container.style.minWidth = `max-content`
        header.innerHTML = 'Show debug'
      } else {
        element.style.display = 'flex'
        container.style.minWidth = `${width}px`
        header.innerHTML = 'Hide debug'
      }
    })
  }

  const restored = restore(STORAGE_KEY)
  if (restored) {
    minimized = restored.minimized
  }

  renderElements()

  header.addEventListener('click', () => {
    minimized = !minimized
    renderElements()
    save(STORAGE_KEY, { minimized })
  })

  /**
   * Call whenever you want the data to update. Suggestion: Once per second.
   */
  const render = () => {
    elements.forEach((element) => {
      const { type } = element
      if (type === 'label') {
        const { getData, valueElement, threshold } = element
        // @ts-ignore
        const data = getData()
        // @ts-ignore
        valueElement.innerHTML = `${data || '-'}`
        if (threshold && data >= threshold) {
          // @ts-ignore
          valueElement.style.color = 'red'
        } else {
          // @ts-ignore
          valueElement.style.color = 'white'
        }
      }
    })
  }

  return render
}
