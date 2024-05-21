export const findCommonCommunities = (
  array1: number[],
  array2: number[]
): number[] => {
  const set1 = new Set(array1)
  const set2 = new Set(array2)
  const commonNumbers: number[] = []

  for (const num of set1) {
    if (set2.has(num)) {
      commonNumbers.push(num)
    }
  }

  return commonNumbers
}
