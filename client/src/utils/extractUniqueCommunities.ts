export const extractUniqueCommunities = (
  addressInfo: Array<{ usersAddress_communityID: number }>
): number[] => {
  const uniqueCommunities = new Set<number>()

  for (const address of addressInfo) {
    const { usersAddress_communityID } = address
    uniqueCommunities.add(usersAddress_communityID)
  }

  // Konwertuj Set na tablicę wynikową
  const result: number[] = Array.from(uniqueCommunities)
  return result
}
