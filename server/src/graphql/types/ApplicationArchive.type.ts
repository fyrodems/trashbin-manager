import { objectType } from 'nexus'

const AddressApplicationArchiveType = objectType({
  name: 'AddressApplicationArchiveType',
  definition(t) {
    t.nonNull.int('addressApplications_ID')
    t.nonNull.string('addressApplications_dateAdded')
    t.nullable.string('addressApplications_dateReviewed')
    t.nonNull.int('addressApplications_typeID')
    t.nullable.int('addressApplications_reviewedBy')
    t.nonNull.int('addressApplications_userID')
    t.nonNull.int('addressApplications_statusID')
    t.nonNull.string('addressApplications_street')
    t.nonNull.string('addressApplications_houseNumber')
    t.nullable.string('addressApplications_apartamentNumber')
    t.nonNull.string('addressApplications_postCode')
    t.nonNull.string('addressApplications_city')
    t.nonNull.int('addressApplications_addressTypeID')
    t.nonNull.int('addressApplications_communityID')
    t.nullable.int('addressApplications_addressID')
    t.nonNull.string('addressApplications_userName')
    t.nonNull.string('addressApplications_userLogin')
    t.nonNull.string('addressApplications_userIdentificationNumber')
  },
})

const CardApplicationArchiveType = objectType({
  name: 'CardApplicationArchiveType',
  definition(t) {
    t.nonNull.int('cardsApplications_ID')
    t.nonNull.string('cardsApplications_dateAdded')
    t.nullable.string('cardsApplications_dateReviewed')
    t.nonNull.int('cardsApplications_typeID')
    t.nullable.int('cardsApplications_reviewedBy')
    t.nonNull.int('cardsApplications_userID')
    t.nonNull.int('cardsApplications_statusID')
    t.nonNull.string('cardsApplications_userName')
    t.nonNull.string('cardsApplications_userLogin')
    t.nonNull.string('cardsApplications_userIdentificationNumber')
  },
})

const DumpsterApplicationArchiveType = objectType({
  name: 'DumpsterApplicationArchiveType',
  definition(t) {
    t.nonNull.int('dumpstersApplications_ID')
    t.nonNull.string('dumpstersApplications_dateAdded')
    t.nullable.string('dumpstersApplications_dateReviewed')
    t.nonNull.int('dumpstersApplications_typeID')
    t.nullable.int('dumpstersApplications_reviewedBy')
    t.nonNull.int('dumpstersApplications_userID')
    t.nonNull.int('dumpstersApplications_dumpsterID')
    t.nonNull.int('dumpstersApplications_statusID')
    t.nonNull.int('dumpstersApplications_cardID')
    t.nonNull.string('dumpstersApplications_userName')
    t.nonNull.string('dumpstersApplications_userLogin')
    t.nonNull.string('dumpstersApplications_userIdentificationNumber')
    t.nonNull.string('dumpstersApplications_cardNumber')
    t.nonNull.string('dumpstersApplications_dumpsterNumber')
  },
})

const PersonalDataApplicationArchiveType = objectType({
  name: 'PersonalDataApplicationArchiveType',
  definition(t) {
    t.nonNull.int('personalDataApplications_ID')
    t.nonNull.string('personalDataApplications_dateAdded')
    t.nullable.string('personalDataApplications_dateReviewed')
    t.nonNull.int('personalDataApplications_typeID')
    t.nullable.int('personalDataApplications_reviewedBy')
    t.nonNull.int('personalDataApplications_userID')
    t.nonNull.int('personalDataApplications_statusID')
    t.nonNull.string('personalDataApplications_name')
    t.nonNull.string('personalDataApplications_userName')
    t.nonNull.string('personalDataApplications_userLogin')
    t.nonNull.string('personalDataApplications_userIdentificationNumber')
  },
})

export const ApplicationArchiveType = objectType({
  name: 'ApplicationArchiveType',
  definition(t) {
    t.nonNull.list.nullable.field('addressApplications', {
      type: AddressApplicationArchiveType,
    })
    t.nonNull.list.nullable.field('cardsApplications', {
      type: CardApplicationArchiveType,
    })
    t.nonNull.list.nullable.field('dumpstersApplications', {
      type: DumpsterApplicationArchiveType,
    })
    t.nonNull.list.nullable.field('personalDataApplications', {
      type: PersonalDataApplicationArchiveType,
    })
  },
})
