/*
  Warnings:

  - You are about to drop the column `cardsApplications_applicationID` on the `CardsApplications_Dumpsters` table. All the data in the column will be lost.
  - You are about to drop the column `cardsApplications_dumpsterID` on the `CardsApplications_Dumpsters` table. All the data in the column will be lost.
  - Added the required column `cardsApplicationsDumpsters_applicationID` to the `CardsApplications_Dumpsters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardsApplicationsDumpsters_dumpsterID` to the `CardsApplications_Dumpsters` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CardsApplications_Dumpsters] DROP CONSTRAINT [CardsApplications_Dumpsters_cardsApplications_applicationID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[CardsApplications_Dumpsters] DROP CONSTRAINT [CardsApplications_Dumpsters_cardsApplications_dumpsterID_fkey];

-- AlterTable
ALTER TABLE [dbo].[CardsApplications_Dumpsters] DROP COLUMN [cardsApplications_applicationID],
[cardsApplications_dumpsterID];
ALTER TABLE [dbo].[CardsApplications_Dumpsters] ADD [cardsApplicationsDumpsters_applicationID] INT NOT NULL,
[cardsApplicationsDumpsters_dumpsterID] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[CardsApplications_Dumpsters] ADD CONSTRAINT [CardsApplications_Dumpsters_cardsApplicationsDumpsters_applicationID_fkey] FOREIGN KEY ([cardsApplicationsDumpsters_applicationID]) REFERENCES [dbo].[Cards_Applications]([cardsApplications_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CardsApplications_Dumpsters] ADD CONSTRAINT [CardsApplications_Dumpsters_cardsApplicationsDumpsters_dumpsterID_fkey] FOREIGN KEY ([cardsApplicationsDumpsters_dumpsterID]) REFERENCES [dbo].[Dumpster]([dumpster_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
