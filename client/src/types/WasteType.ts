export enum WasteType {
  PAPER = 11,
  BIO = 12,
  METALS_AND_PLASTICS = 13,
  GLASS = 14,
  MIXED = 15,
}

export const WasteTypeConstant = {
  11: 'Papier',
  12: 'Bio',
  13: 'Metale i tworzywa sztuczne',
  14: 'Szkło',
  15: 'Zmieszane',
} as const
