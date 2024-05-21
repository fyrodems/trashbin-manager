/*
  Warnings:

  - Added the required column `dumpstersApplications_cardID` to the `Dumpsters_Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dumpstersApplications_statusID` to the `Dumpsters_Applications` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Dumpsters_Applications] ADD [dumpstersApplications_cardID] INT NOT NULL,
[dumpstersApplications_statusID] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_statusID_fkey] FOREIGN KEY ([dumpstersApplications_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpsters_Applications] ADD CONSTRAINT [Dumpsters_Applications_dumpstersApplications_cardID_fkey] FOREIGN KEY ([dumpstersApplications_cardID]) REFERENCES [dbo].[Users_Cards]([usersCards_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
