BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Dumpster_Owners] DROP CONSTRAINT [Dumpster_Owners_dumpsterOwners_ownerID_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[Dumpster_Owners] ADD CONSTRAINT [Dumpster_Owners_dumpsterOwners_ownerID_fkey] FOREIGN KEY ([dumpsterOwners_ownerID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
