/*
  Warnings:

  - You are about to drop the column `addressApplications_addressID` on the `Address_Applications` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Address_Applications] DROP CONSTRAINT [Address_Applications_addressApplications_addressID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Address_Applications] DROP COLUMN [addressApplications_addressID];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
