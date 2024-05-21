/*
  Warnings:

  - You are about to drop the `Card_Dumpsters` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Card_Dumpsters] DROP CONSTRAINT [Card_Dumpsters_cardDumpsters_cardID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Card_Dumpsters] DROP CONSTRAINT [Card_Dumpsters_cardDumpsters_dumpsterID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Card_Dumpsters] DROP CONSTRAINT [Card_Dumpsters_cardDumpsters_statusID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Users_Cards] ADD [usersCards_dumpstersIDs] NVARCHAR(1000) NOT NULL CONSTRAINT [Users_Cards_usersCards_dumpstersIDs_df] DEFAULT '';

-- DropTable
DROP TABLE [dbo].[Card_Dumpsters];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
