/*
  Warnings:

  - You are about to drop the column `rate_dateFrom` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `rate_dateTo` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `rate_typeGarbageID` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `rate_usersContractID` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `rate_usersID` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the `Rate_Logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users_Contract` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rate_dumpsterContractID` to the `Rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate_typeID` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Rate] DROP CONSTRAINT [Rate_rate_typeGarbageID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Rate] DROP CONSTRAINT [Rate_rate_usersContractID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Rate] DROP CONSTRAINT [Rate_rate_usersID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Rate_Logs] DROP CONSTRAINT [Rate_Logs_rateLogs_changeIDUser_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Rate_Logs] DROP CONSTRAINT [Rate_Logs_rateLogs_rateID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Users_Contract] DROP CONSTRAINT [Users_Contract_usersContract_communityID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Users_Contract] DROP CONSTRAINT [Users_Contract_usersContract_statusID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Users_Contract] DROP CONSTRAINT [Users_Contract_usersContract_usersID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Rate] DROP COLUMN [rate_dateFrom],
[rate_dateTo],
[rate_typeGarbageID],
[rate_usersContractID],
[rate_usersID];
ALTER TABLE [dbo].[Rate] ADD [rate_dumpsterContractID] INT NOT NULL,
[rate_typeID] INT NOT NULL;

-- DropTable
DROP TABLE [dbo].[Rate_Logs];

-- DropTable
DROP TABLE [dbo].[Users_Contract];

-- CreateTable
CREATE TABLE [dbo].[Dumpster_Contract] (
    [dumpsterContract_ID] INT NOT NULL,
    [dumpsterContract_number] NVARCHAR(1000) NOT NULL,
    [dumpsterContract_dumpsterID] INT NOT NULL,
    [dumpsterContract_dateFrom] DATETIME2 NOT NULL,
    [dumpsterContract_dateTo] DATETIME2 NOT NULL,
    [dumpsterContract_statusID] INT NOT NULL,
    [dumpsterContract_communityID] INT NOT NULL,
    CONSTRAINT [Dumpster_Contract_pkey] PRIMARY KEY CLUSTERED ([dumpsterContract_ID]),
    CONSTRAINT [Dumpster_Contract_dumpsterContract_ID_key] UNIQUE NONCLUSTERED ([dumpsterContract_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_rate_typeID_fkey] FOREIGN KEY ([rate_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Rate] ADD CONSTRAINT [Rate_rate_dumpsterContractID_fkey] FOREIGN KEY ([rate_dumpsterContractID]) REFERENCES [dbo].[Dumpster_Contract]([dumpsterContract_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Contract] ADD CONSTRAINT [Dumpster_Contract_dumpsterContract_dumpsterID_fkey] FOREIGN KEY ([dumpsterContract_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Contract] ADD CONSTRAINT [Dumpster_Contract_dumpsterContract_statusID_fkey] FOREIGN KEY ([dumpsterContract_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Contract] ADD CONSTRAINT [Dumpster_Contract_dumpsterContract_communityID_fkey] FOREIGN KEY ([dumpsterContract_communityID]) REFERENCES [dbo].[Community]([community_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
