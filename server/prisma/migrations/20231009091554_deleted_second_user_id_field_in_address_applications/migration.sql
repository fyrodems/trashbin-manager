/*
  Warnings:

  - You are about to drop the column `usersAddress_userID` on the `Address_Applications` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Address_Applications] DROP COLUMN [usersAddress_userID];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
