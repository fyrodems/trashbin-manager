const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const Voivodeships = require('./data/voivodeship')
const Communities = require('./data/community')
const Dumpsters = require('./data/dumpster')
const UsersAddresses = require('./data/usersAddress')
const Users = require('./data/users')
const Types = require('./data/type')
const Statuses = require('./data/status')
const UsersCards = require('./data/usersCards')
const Municipalities = require('./data/municipality')
const Garbages = require('./data/garbage')
const Contracts = require('./data/dumpsterContract')
const Rates = require('./data/rates')
const DumpsterBins = require('./data/dumpsterBins')

const seedVoivodeships = () => {
  Voivodeships.map(
    async (voivodeship) =>
      await prisma.voivodeship.upsert({
        where: { voivodeship_ID: voivodeship.voivodeship_ID },
        update: {
          voivodeship_ID: voivodeship.voivodeship_ID,
          voivodeship_name: voivodeship.voivodeship_name,
          voivodeship_description: voivodeship.voivodeship_description,
        },
        create: {
          voivodeship_ID: voivodeship.voivodeship_ID,
          voivodeship_name: voivodeship.voivodeship_name,
          voivodeship_description: voivodeship.voivodeship_description,
        },
      })
  )
}
const seedTypes = () => {
  Types.map(
    async (type) =>
      await prisma.type.upsert({
        where: { type_ID: type.type_ID },
        update: {
          type_ID: type.type_ID,
          type_name: type.type_name,
          type_description: type.type_description,
          type_type: type.type_type,
        },
        create: {
          type_ID: type.type_ID,
          type_name: type.type_name,
          type_description: type.type_description,
          type_type: type.type_type,
        },
      })
  )
}
const seedMunicipalities = () => {
  Municipalities.map(
    async (municipality) =>
      await prisma.municipality.upsert({
        where: { municipality_ID: municipality.municipality_ID },
        update: {
          municipality_ID: municipality.municipality_ID,
          municipality_name: municipality.municipality_name,
          municipality_description: municipality.municipality_description,
          municipality_voivodeshipID: municipality.municipality_voivodeshipID,
        },
        create: {
          municipality_ID: municipality.municipality_ID,
          municipality_name: municipality.municipality_name,
          municipality_description: municipality.municipality_description,
          municipality_voivodeshipID: municipality.municipality_voivodeshipID,
        },
      })
  )
}
const seedCommunities = async () => {
  prisma.community.deleteMany()
  Communities.map(
    async (community) =>
      await prisma.community.upsert({
        where: { community_ID: community.community_ID },
        update: {
          community_ID: community.community_ID,
          community_name: community.community_name,
          community_description: community.community_description,
          community_municipalityID: community.community_municipalityID,
          community_voivodeshipID: community.community_voivodeshipID,
        },
        create: {
          community_ID: community.community_ID,
          community_name: community.community_name,
          community_description: community.community_description,
          community_municipalityID: community.community_municipalityID,
          community_voivodeshipID: community.community_voivodeshipID,
        },
      })
  )
}
const seedDumpsters = () => {
  Dumpsters.map(
    async (dumpster) =>
      await prisma.dumpster.upsert({
        where: { dumpster_ID: dumpster.dumpster_ID },
        update: {
          dumpster_ID: dumpster.dumpster_ID,
          dumpster_name: dumpster.dumpster_name,
          dumpster_description: dumpster.dumpster_description,
          dumpster_street: dumpster.dumpster_street,
          dumpster_city: dumpster.dumpster_city,
          dumpster_postCode: dumpster.dumpster_postCode,
          dumpster_communityID: dumpster.dumpster_communityID,
          dumpster_houseNumbers: dumpster.dumpster_houseNumbers,
          dumpster_hasError: dumpster.dumpster_hasError,
          dumpster_statusID: dumpster.dumpster_statusID,
        },
        create: {
          dumpster_ID: dumpster.dumpster_ID,
          dumpster_name: dumpster.dumpster_name,
          dumpster_description: dumpster.dumpster_description,
          dumpster_street: dumpster.dumpster_street,
          dumpster_city: dumpster.dumpster_city,
          dumpster_postCode: dumpster.dumpster_postCode,
          dumpster_communityID: dumpster.dumpster_communityID,
          dumpster_houseNumbers: dumpster.dumpster_houseNumbers,
          dumpster_hasError: dumpster.dumpster_hasError,
          dumpster_statusID: dumpster.dumpster_statusID,
        },
      })
  )
}
const seedUsers = () => {
  Users.map(
    async (user) =>
      await prisma.users.upsert({
        where: { users_ID: user.users_ID },
        update: {
          users_ID: user.users_ID,
          users_login: user.users_login,
          users_password: user.users_password,
          users_name: user.users_name,
          users_typeID: user.users_typeID,
          users_statusID: user.users_statusID,
          users_identificationNumber: user.users_identificationNumber,
          users_phoneNumber: user.users_phoneNumber,
        },
        create: {
          users_ID: user.users_ID,
          users_login: user.users_login,
          users_password: user.users_password,
          users_name: user.users_name,
          users_typeID: user.users_typeID,
          users_statusID: user.users_statusID,
          users_identificationNumber: user.users_identificationNumber,
          users_phoneNumber: user.users_phoneNumber,
        },
      })
  )
}
const seedUsersAddresses = () => {
  UsersAddresses.map(
    async (usersAddress) =>
      await prisma.users_Address.upsert({
        where: { usersAddress_ID: usersAddress.usersAddress_ID },
        update: {
          usersAddress_ID: usersAddress.usersAddress_ID,
          usersAddress_userID: usersAddress.usersAddress_userID,
          usersAddress_street: usersAddress.usersAddress_street,
          usersAddress_houseNumber: usersAddress.usersAddress_houseNumber,
          usersAddress_apartamentNumber:
            usersAddress.usersAddress_apartamentNumber,
          usersAddress_postCode: usersAddress.usersAddress_postCode,
          usersAddress_city: usersAddress.usersAddress_city,
          usersAddress_typeID: usersAddress.usersAddress_typeID,
          usersAddress_communityID: usersAddress.usersAddress_communityID,
        },
        create: {
          usersAddress_ID: usersAddress.usersAddress_ID,
          usersAddress_userID: usersAddress.usersAddress_userID,
          usersAddress_street: usersAddress.usersAddress_street,
          usersAddress_houseNumber: usersAddress.usersAddress_houseNumber,
          usersAddress_apartamentNumber:
            usersAddress.usersAddress_apartamentNumber,
          usersAddress_postCode: usersAddress.usersAddress_postCode,
          usersAddress_city: usersAddress.usersAddress_city,
          usersAddress_typeID: usersAddress.usersAddress_typeID,
          usersAddress_communityID: usersAddress.usersAddress_communityID,
        },
      })
  )
}
const seedStatuses = () => {
  Statuses.map(
    async (status) =>
      await prisma.status.upsert({
        where: { status_ID: status.status_ID },
        update: {
          status_ID: status.status_ID,
          status_name: status.status_name,
          status_description: status.status_description,
          status_type: status.status_type,
        },
        create: {
          status_ID: status.status_ID,
          status_name: status.status_name,
          status_description: status.status_description,
          status_type: status.status_type,
        },
      })
  )
}
const seedUsersCards = () => {
  UsersCards.map(
    async (userCard) =>
      await prisma.users_Cards.upsert({
        where: { usersCards_ID: userCard.usersCards_ID },
        update: {
          usersCards_ID: userCard.usersCards_ID,
          usersCards_userID: userCard.usersCards_userID,
          usersCards_statusID: userCard.usersCards_statusID,
          usersCards_number: userCard.usersCards_number,
          usersCards_numberPIN: userCard.usersCards_numberPIN,
          usersCards_rentedToUserID: userCard.usersCards_rentedToUserID,
          usersCards_typeID: userCard.usersCards_typeID,
        },
        create: {
          usersCards_ID: userCard.usersCards_ID,
          usersCards_userID: userCard.usersCards_userID,
          usersCards_statusID: userCard.usersCards_statusID,
          usersCards_number: userCard.usersCards_number,
          usersCards_numberPIN: userCard.usersCards_numberPIN,
          usersCards_rentedToUserID: userCard.usersCards_rentedToUserID,
          usersCards_typeID: userCard.usersCards_typeID,
        },
      })
  )
}
const seedGarbages = () => {
  Garbages.map(
    async (garbage) =>
      await prisma.garbage.upsert({
        where: { garbage_ID: garbage.garbage_ID },
        update: {
          garbage_ID: garbage.garbage_ID,
          garbage_usersID: garbage.garbage_usersID,
          garbage_dumpsterID: garbage.garbage_dumpsterID,
          garbage_typeID: garbage.garbage_typeID,
          garbage_weight: garbage.garbage_weight,
          garbage_date: garbage.garbage_date,
          garbage_cardID: garbage.garbage_cardID,
        },
        create: {
          garbage_ID: garbage.garbage_ID,
          garbage_usersID: garbage.garbage_usersID,
          garbage_dumpsterID: garbage.garbage_dumpsterID,
          garbage_typeID: garbage.garbage_typeID,
          garbage_weight: garbage.garbage_weight,
          garbage_date: garbage.garbage_date,
          garbage_cardID: garbage.garbage_cardID,
        },
      })
  )
}

const seedContracts = () => {
  Contracts.map(
    async (dumpsterContract) =>
      await prisma.dumpster_Contract.upsert({
        where: { dumpsterContract_ID: dumpsterContract.dumpsterContract_ID },
        update: {
          dumpsterContract_ID: dumpsterContract.dumpsterContract_ID,
          dumpsterContract_number: dumpsterContract.dumpsterContract_number,
          dumpsterContract_dumpsterID:
            dumpsterContract.dumpsterContract_dumpsterID,
          dumpsterContract_dateFrom: dumpsterContract.dumpsterContract_dateFrom,
          dumpsterContract_dateTo: dumpsterContract.dumpsterContract_dateTo,
          dumpsterContract_statusID: dumpsterContract.dumpsterContract_statusID,
          dumpsterContract_communityID:
            dumpsterContract.dumpsterContract_communityID,
        },
        create: {
          dumpsterContract_ID: dumpsterContract.dumpsterContract_ID,
          dumpsterContract_number: dumpsterContract.dumpsterContract_number,
          dumpsterContract_dumpsterID:
            dumpsterContract.dumpsterContract_dumpsterID,
          dumpsterContract_dateFrom: dumpsterContract.dumpsterContract_dateFrom,
          dumpsterContract_dateTo: dumpsterContract.dumpsterContract_dateTo,
          dumpsterContract_statusID: dumpsterContract.dumpsterContract_statusID,
          dumpsterContract_communityID:
            dumpsterContract.dumpsterContract_communityID,
        },
      })
  )
}

const seedRates = () => {
  Rates.map(
    async (usersRate) =>
      await prisma.rate.upsert({
        where: { rate_ID: usersRate.rate_ID },
        update: {
          rate_ID: usersRate.rate_ID,
          rate_typeID: usersRate.rate_typeID,
          rate_dumpsterContractID: usersRate.rate_dumpsterContractID,
          rate_userContractID: usersRate.rate_userContractID,
          rate_value: usersRate.rate_value,
          rate_statusID: usersRate.rate_statusID,
        },
        create: {
          rate_ID: usersRate.rate_ID,
          rate_typeID: usersRate.rate_typeID,
          rate_dumpsterContractID: usersRate.rate_dumpsterContractID,
          rate_userContractID: usersRate.rate_userContractID,
          rate_value: usersRate.rate_value,
          rate_statusID: usersRate.rate_statusID,
        },
      })
  )
}

const seedDumpsterBins = () => {
  DumpsterBins.map(
    async (dumpsterBin) =>
      await prisma.dumpster_Bin.upsert({
        where: { dumpsterBin_ID: dumpsterBin.dumpsterBin_ID },
        update: {
          dumpsterBin_ID: dumpsterBin.dumpsterBin_ID,
          dumpsterBin_dumpsterID: dumpsterBin.dumpsterBin_dumpsterID,
          dumpsterBin_isFull: dumpsterBin.dumpsterBin_isFull,
          dumpsterBin_typeID: dumpsterBin.dumpsterBin_typeID,
        },
        create: {
          dumpsterBin_ID: dumpsterBin.dumpsterBin_ID,
          dumpsterBin_dumpsterID: dumpsterBin.dumpsterBin_dumpsterID,
          dumpsterBin_isFull: dumpsterBin.dumpsterBin_isFull,
          dumpsterBin_typeID: dumpsterBin.dumpsterBin_typeID,
        },
      })
  )
}

function runSeeders() {
  /*   seedVoivodeships()
  seedStatuses()
  seedTypes()
  seedMunicipalities()

  seedCommunities() */
  /*   seedUsers() */
  /*   seedDumpsters() */
  /*   seedUsersCards() */
  /*   seedGarbages() */
  /*   seedContracts()
  seedRates()
  seedDumpsterBins() */
  /*   seedUsersAddresses() */
}

runSeeders()
