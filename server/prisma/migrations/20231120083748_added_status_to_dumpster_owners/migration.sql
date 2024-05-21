BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Dumpster_Owners] ADD [dumpsterOwners_statusID] INT NOT NULL CONSTRAINT [Dumpster_Owners_dumpsterOwners_statusID_df] DEFAULT 1;

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Owners] ADD CONSTRAINT [Dumpster_Owners_dumpsterOwners_statusID_fkey] FOREIGN KEY ([dumpsterOwners_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
