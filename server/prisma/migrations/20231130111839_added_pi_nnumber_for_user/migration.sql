BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Users] ADD [users_PINnumber] INT;

-- AlterTable
ALTER TABLE [dbo].[Users_Cards] ADD [usersCards_typeID] INT NOT NULL CONSTRAINT [Users_Cards_usersCards_typeID_df] DEFAULT 26;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Cards] ADD CONSTRAINT [Users_Cards_usersCards_typeID_fkey] FOREIGN KEY ([usersCards_typeID]) REFERENCES [dbo].[Type]([type_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
