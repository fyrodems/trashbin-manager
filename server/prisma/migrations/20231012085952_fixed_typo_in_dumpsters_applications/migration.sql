/*
  Warnings:

  - You are about to drop the column `dumpsterApplications_changeType` on the `Dumpsters_Applications` table. All the data in the column will be lost.
  - Added the required column `dumpstersApplications_changeType` to the `Dumpsters_Applications` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] DROP CONSTRAINT [Dumpsters_Applications_dumpsterApplications_changeType_fkey];

-- AlterTable
ALTER TABLE [dbo].[Dumpsters_Applications] DROP COLUMN [dumpsterApplications_changeType];
ALTER TABLE [dbo].[Dumpsters_Applications] ADD [dumpstersApplications_changeType] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_changeType_fkey] FOREIGN KEY ([dumpstersApplications_changeType]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
