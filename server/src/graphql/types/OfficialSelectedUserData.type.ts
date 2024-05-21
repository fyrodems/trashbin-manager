import { objectType } from 'nexus'
import { OfficialUserSearchType } from './OfficialUserSearch.type'
import { DumpsterInfoType } from './DumpsterInfo.type'
import { OfficialCardsTypeWDumpstersType } from './OfficialCardsTypeWDumpsters.type'
import { UsersAddressType } from './UsersAddress.type'
import { UserContractType } from './UserContract.type'

export const HousingAssociationRatesType = objectType({
  name: 'HousingAssociationRatesType',
  definition(t) {
    t.nullable.int('paper')
    t.nullable.int('plastic')
    t.nullable.int('glass')
    t.nullable.int('bio')
    t.nullable.int('mixed')
  },
})

export const HousingAssociationContractsType = objectType({
  name: 'HousingAssociationContractsType',
  definition(t) {
    t.nullable.field('rates', { type: HousingAssociationRatesType })
    t.nonNull.int('dumpsterContract_ID')
    t.nonNull.string('dumpsterContract_number')
    t.nonNull.int('dumpsterContract_dumpsterID')
    t.nonNull.string('dumpsterContract_dateFrom')
    t.nonNull.string('dumpsterContract_dateTo')
    t.nonNull.int('dumpsterContract_statusID')
    t.nonNull.int('dumpsterContract_communityID')
  },
})

export const OfficialSelectedUserDataType = objectType({
  name: 'OfficialSelectedUserDataType',
  definition(t) {
    t.nonNull.int('userType')
    t.nonNull.field('basicInfo', { type: OfficialUserSearchType })
    t.nonNull.list.field('cards', { type: OfficialCardsTypeWDumpstersType })
    t.nonNull.list.field('dumpsters', { type: DumpsterInfoType })
    t.nonNull.list.field('addressInfo', { type: UsersAddressType })
    t.nullable.field('contracts', { type: UserContractType })
  },
})
