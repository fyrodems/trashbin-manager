/*
  Warnings:

  - You are about to drop the `Contract_Applications` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Contract_Applications] DROP CONSTRAINT [Contract_Applications_contractApplications_communityID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Contract_Applications] DROP CONSTRAINT [Contract_Applications_contractApplications_reviewedBy_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Contract_Applications] DROP CONSTRAINT [Contract_Applications_contractApplications_statusID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Contract_Applications] DROP CONSTRAINT [Contract_Applications_contractApplications_typeID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Contract_Applications] DROP CONSTRAINT [Contract_Applications_contractApplications_userID_fkey];

-- DropTable
DROP TABLE [dbo].[Contract_Applications];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
