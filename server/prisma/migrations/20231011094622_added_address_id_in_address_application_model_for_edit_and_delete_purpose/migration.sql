BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Address_Applications] ADD [addressApplications_addressID] INT;

-- AddForeignKey
ALTER TABLE [dbo].[Address_Applications] ADD CONSTRAINT [Address_Applications_addressApplications_addressID_fkey] FOREIGN KEY ([addressApplications_addressID]) REFERENCES [dbo].[Users_Address]([usersAddress_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
