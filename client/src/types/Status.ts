/**
 * zmienić Status na AccountStatus
 * jak będziemy przeglądać kod w celu zastosowania tych statusów
 */

export enum Status {
  ACTIVE = 1,
  BLOCKED = 2,
  FOR_APPROVAL = 3,
}

export enum AccountStatus {
  ACTIVE = 1,
  BLOCKED = 2,
  FOR_APPROVAL = 3,
}

export enum CardStatus {
  ACTIVE = 4,
  BLOCKED = 5,
}

export enum AttachCardToDumpster {
  ACTIVE = 7,
  DEACTIVE = 8,
}

export enum ApplicationStatus {
  FOR_APPROVAL = 9,
  APPROVED = 10,
  REJECTED = 11,
  CANCELED = 12,
}

export enum RateStatus {
  CURRENT = 13,
  HISTORICAL = 14,
}

export enum ContractStatus {
  CURRENT = 15,
  HISTORICAL = 16,
}

export enum DumpsterOwnerStatus {
  CURRENT = 17,
  HISTORICAL = 18,
}

export enum CardBulkStatus {
  FOR_APPROVAL = 19,
  APPROVED = 20,
  REJECTED = 21,
}

export enum HousingAssociationStatus {
  CURRENT = 22,
  HISTORICAL = 23,
}

export enum AddressStatus {
  CURRENT = 24,
  FOR_APPROVAL = 25,
  HISTORICAL = 26,
}

export enum DumpsterStatus {
  ACTIVE = 27,
  DEACTIVE = 28,
}
