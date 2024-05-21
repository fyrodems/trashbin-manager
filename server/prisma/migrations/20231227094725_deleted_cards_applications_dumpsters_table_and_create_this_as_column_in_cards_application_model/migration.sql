/*
  Warnings:

  - You are about to drop the column `cardsApplications_number` on the `Cards_Applications` table. All the data in the column will be lost.
  - You are about to drop the `CardsApplications_Dumpsters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cardsApplications_dumpstersIDs` to the `Cards_Applications` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CardsApplications_Dumpsters] DROP CONSTRAINT [CardsApplications_Dumpsters_cardsApplicationsDumpsters_applicationID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[CardsApplications_Dumpsters] DROP CONSTRAINT [CardsApplications_Dumpsters_cardsApplicationsDumpsters_dumpsterID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Cards_Applications] DROP COLUMN [cardsApplications_number];
ALTER TABLE [dbo].[Cards_Applications] ADD [cardsApplications_dumpstersIDs] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[CardsApplications_Dumpsters];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
