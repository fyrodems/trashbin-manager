import { objectType } from 'nexus'

export const RateType = objectType({
  name: 'RateType',
  definition(t) {
    t.nullable.float('paper')
    t.nullable.float('plastic')
    t.nullable.float('glass')
    t.nullable.float('bio')
    t.nullable.float('mixed')
  },
})

export const UserContractMainType = objectType({
  name: 'UserContractMainType',
  definition(t) {
    t.nonNull.int('usersContract_ID')
    t.nonNull.int('usersContract_userID')
    t.nonNull.string('usersContract_number')
    t.nonNull.string('usersContract_dateFrom')
    t.nonNull.string('usersContract_dateTo')
    t.nonNull.int('usersContract_statusID')
    t.nonNull.int('usersContract_communityID')
    t.nullable.field('rates', { type: RateType })
  },
})

export const UserContractDumpsterType = objectType({
  name: 'UserContractDumpsterType',
  definition(t) {
    t.nonNull.int('dumpsterContract_ID', { description: 'ID of the contract' })
    t.nonNull.string('dumpsterContract_number', {
      description: 'Contract number',
    })
    t.nonNull.int('dumpsterContract_dumpsterID')
    t.nonNull.string('dumpsterContract_dateFrom')
    t.nonNull.string('dumpsterContract_dateTo')
    t.nonNull.int('dumpsterContract_statusID')
    t.nonNull.int('dumpsterContract_communityID')
    t.nullable.field('rates', { type: RateType })
  },
})

export const UserContractType = objectType({
  name: 'UserContractType',
  definition(t) {
    t.nullable.list.nonNull.field('userContracts', {
      type: UserContractMainType,
    })
    t.nullable.list.nonNull.field('housingAssociationContracts', {
      type: UserContractDumpsterType,
    })
  },
})
