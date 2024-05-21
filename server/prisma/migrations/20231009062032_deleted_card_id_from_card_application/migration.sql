/*
  Warnings:

  - You are about to drop the column `cardsApplications_cardID` on the `Cards_Applications` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Cards_Applications] DROP CONSTRAINT [Cards_Applications_cardsApplications_cardID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Cards_Applications] DROP COLUMN [cardsApplications_cardID];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
