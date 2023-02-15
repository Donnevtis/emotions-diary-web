export const isDark = (color: string) => {
  const hexColor = Number(color.replace(/^#/, '0x'))

  if (isNaN(hexColor)) return

  return 0x555555 > hexColor
}

export const recordToNested = (array: Record<string, string[]>) =>
  Object.entries(array).map(([name, value]) => ({
    label: name,
    value: name,
    children: value.map((v) => ({ label: v, value: v })),
  }))

// eslint-disable-next-line no-console
export const printError = (...error: unknown[]) => console.error(...error)

export const deleteItemFromArray = <T>(array: T[], index: number): T[] => [
  ...array.slice(0, index),
  ...array.slice(index + 1, array.length),
]

export const updateArrayItem = <T>(
  array: T[],
  index: number,
  newItem: T
): T[] => [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index + 1, array.length),
]

export const queryParam = new URLSearchParams(window.location.search)
