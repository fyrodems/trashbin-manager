export interface Garbage {
  szklo?: number
  bioodpady?: number
  zmieszane?: number
  papier?: number
  metaleITworzywa?: number
}

export interface Dumpster {
  garbage?: Garbage
}

export interface TotalGarbage {
  szklo: number
  bioodpady: number
  zmieszane: number
  papier: number
  metaleITworzywa: number
}

interface GarbageType {
  bio: number
  glass: number
  mixed: number
  paper: number
  plastic: number
}

interface CompanyGarbageType {
  dumpsterID: number
  garbage: GarbageType
}

type CompanyData = Record<number, CompanyGarbageType>

export interface CompanyGarbageProps {
  allGarbage: CompanyData
}
