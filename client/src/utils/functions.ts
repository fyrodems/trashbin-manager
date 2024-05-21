function circularMapStartingAtIndex<T>(
  array: T[],
  startIndex: number,
  callback: (item: T, index: number) => T
): T[] {
  return array.map((_, index) => {
    const adjustedIndex = (index + startIndex) % array.length
    const item = array[adjustedIndex]
    return callback(item, adjustedIndex)
  })
}

const isMobile = () => {
  const mobileRegex =
    // eslint-disable-next-line unicorn/better-regex
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  const isThisMobileDevice = mobileRegex.test(navigator.userAgent)
  return isThisMobileDevice
}

const isMobileWidth = () => {
  return window.innerWidth < 992
}

const toggleState = (state: boolean, updateState: (state: boolean) => void) => {
  updateState(!state)
}

export { circularMapStartingAtIndex, isMobile, isMobileWidth, toggleState }

export const unitCalculate = (unit: string, value: number) => {
  switch (unit) {
    case 'g': {
      return value
    }

    case 'kg': {
      return value * 0.001
    }

    case 't': {
      return value * 0.000_001
    }

    default: {
      return value
    }
  }
}
