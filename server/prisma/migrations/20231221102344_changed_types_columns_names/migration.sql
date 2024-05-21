/*
  Warnings:

  - You are about to drop the column `addressApplications_changeType` on the `Address_Applications` table. All the data in the column will be lost.
  - You are about to drop the column `cardsApplications_changeType` on the `Cards_Applications` table. All the data in the column will be lost.
  - You are about to drop the column `contractApplications_changeType` on the `Contract_Applications` table. All the data in the column will be lost.
  - You are about to drop the column `dumpsterBin_garbageType` on the `Dumpster_Bin` table. All the data in the column will be lost.
  - You are about to drop the column `dumpstersApplications_changeType` on the `Dumpsters_Applications` table. All the data in the column will be lost.
  - You are about to drop the column `personalDataApplications_changeType` on the `PersonalData_Applications` table. All the data in the column will be lost.
  - Added the required column `addressApplications_addressTypeID` to the `Address_Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardsApplications_typeID` to the `Cards_Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractApplications_typeID` to the `Contract_Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dumpsterBin_typeID` to the `Dumpster_Bin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dumpstersApplications_typeID` to the `Dumpsters_Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalDataApplications_typeID` to the `PersonalData_Applications` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Address_Applications] DROP CONSTRAINT [Address_Applications_addressApplications_changeType_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Address_Applications] DROP CONSTRAINT [Address_Applications_addressApplications_typeID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Cards_Applications] DROP CONSTRAINT [Cards_Applications_cardsApplications_changeType_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Contract_Applications] DROP CONSTRAINT [Contract_Applications_contractApplications_changeType_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Dumpster_Bin] DROP CONSTRAINT [Dumpster_Bin_dumpsterBin_garbageType_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] DROP CONSTRAINT [Dumpsters_Applications_dumpstersApplications_changeType_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PersonalData_Applications] DROP CONSTRAINT [PersonalData_Applications_personalDataApplications_changeType_fkey];

-- AlterTable
ALTER TABLE [dbo].[Address_Applications] DROP COLUMN [addressApplications_changeType];
ALTER TABLE [dbo].[Address_Applications] ADD [addressApplications_addressTypeID] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Card_Dumpsters] DROP CONSTRAINT [Card_Dumpsters_cardDumpsters_statusID_df];
ALTER TABLE [dbo].[Card_Dumpsters] ADD CONSTRAINT [Card_Dumpsters_cardDumpsters_statusID_df] DEFAULT 8 FOR [cardDumpsters_statusID];

-- AlterTable
ALTER TABLE [dbo].[Cards_Applications] DROP COLUMN [cardsApplications_changeType];
ALTER TABLE [dbo].[Cards_Applications] ADD [cardsApplications_typeID] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Contract_Applications] DROP COLUMN [contractApplications_changeType];
ALTER TABLE [dbo].[Contract_Applications] ADD [contractApplications_typeID] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Dumpster_Bin] DROP COLUMN [dumpsterBin_garbageType];
ALTER TABLE [dbo].[Dumpster_Bin] ADD [dumpsterBin_typeID] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Dumpsters_Applications] DROP COLUMN [dumpstersApplications_changeType];
ALTER TABLE [dbo].[Dumpsters_Applications] ADD [dumpstersApplications_typeID] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[PersonalData_Applications] DROP COLUMN [personalDataApplications_changeType];
ALTER TABLE [dbo].[PersonalData_Applications] ADD [personalDataApplications_typeID] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Cards_Applications] ADD CONSTRAINT [Cards_Applications_cardsApplications_typeID_fkey] FOREIGN KEY ([cardsApplications_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_typeID_fkey] FOREIGN KEY ([addressApplications_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_addressTypeID_fkey] FOREIGN KEY ([addressApplications_addressTypeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_typeID_fkey] FOREIGN KEY ([dumpstersApplications_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PersonalData_Applications] ADD CONSTRAINT [PersonalData_Applications_personalDataApplications_typeID_fkey] FOREIGN KEY ([personalDataApplications_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract_Applications] ADD CONSTRAINT [Contract_Applications_contractApplications_typeID_fkey] FOREIGN KEY ([contractApplications_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Bin] ADD CONSTRAINT [Dumpster_Bin_dumpsterBin_typeID_fkey] FOREIGN KEY ([dumpsterBin_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
