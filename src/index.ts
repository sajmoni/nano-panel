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

type BaseItem = {
  readonly type: 'label' | 'button' | 'divider'
}

type Label = BaseItem & {
  readonly getData: () => number | string
  readonly label: string
  readonly threshold?: number
}

type Button = BaseItem & {
  readonly onClick: () => void
  readonly label: string
}

type Divider = BaseItem

export type PanelItem = Label | Button | Divider

type Options = {
  readonly element?: HTMLElement
  readonly width?: number
}

type render = () => void

const createContainer = ({ width }: { width: number }) => {
  const container = document.createElement('div')
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

  return container
}

const createElements = (items: readonly PanelItem[]) => {
  return items.map((item: PanelItem) => {
    const { type } = item
    if (type === ItemType.BUTTON) {
      const { onClick, label } = item as Button
      const element = createButton({ onClick, label })
      return {
        item,
        element,
        valueElement: null,
      }
    }

    if (type === ItemType.DIVIDER) {
      const element = document.createElement('div')
      element.style.height = '1px'
      element.style.backgroundColor = 'lightgray'
      element.style.width = '95%'
      element.style.margin = '5px 0'
      return {
        item,
        element,
        valueElement: null,
      }
    }

    if (type === ItemType.LABEL) {
      const { getData, label } = item as Label

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

      return {
        item,
        element,
        labelElement,
        valueElement,
      }
    }

    throw new Error(`nano-panel: Unknown PanelItem, ${type}`)
  })
}

const createPanel = (
  items: readonly PanelItem[],
  options: Options = {},
): render => {
  const { element: appendTo = document.body, width = 130 } = options

  const container = createContainer({ width })
  appendTo.append(container)

  const header = createButton({ label: 'Hide debug' })
  header.style.alignSelf = 'flex-start'
  container.append(header)

  const elements = createElements(items)
  elements.forEach(({ element }) => {
    container.append(element)
  })

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
      const { item, valueElement } = element

      if (item.type === ItemType.LABEL) {
        const { getData, threshold } = item as Label
        const data = getData()
        // @ts-expect-error
        valueElement.innerHTML = `${data || '-'}`
        if (threshold && data >= threshold) {
          // @ts-expect-error
          valueElement.style.color = 'red'
        } else {
          // @ts-expect-error
          valueElement.style.color = 'white'
        }
      }
    })
  }

  return render
}

export default createPanel
