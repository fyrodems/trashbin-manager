BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Users_Cards] DROP CONSTRAINT [Users_Cards_usersCards_userID_fkey];

-- AlterTable
ALTER TABLE [dbo].[Users_Cards] ADD [usersCards_rentedToUserID] INT;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Cards] ADD CONSTRAINT [Users_Cards_usersCards_userID_fkey] FOREIGN KEY ([usersCards_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Cards] ADD CONSTRAINT [Users_Cards_usersCards_rentedToUserID_fkey] FOREIGN KEY ([usersCards_rentedToUserID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
