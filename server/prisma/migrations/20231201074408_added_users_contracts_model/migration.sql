BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users_Contract] (
    [usersContract_ID] INT NOT NULL,
    [usersContract_userID] INT NOT NULL,
    [usersContract_number] NVARCHAR(1000) NOT NULL,
    [usersContract_dateFrom] DATETIME2 NOT NULL,
    [usersContract_dateTo] DATETIME2 NOT NULL,
    [usersContract_statusID] INT NOT NULL,
    [usersContract_communityID] INT NOT NULL,
    CONSTRAINT [Users_Contract_pkey] PRIMARY KEY CLUSTERED ([usersContract_ID]),
    CONSTRAINT [Users_Contract_usersContract_ID_key] UNIQUE NONCLUSTERED ([usersContract_ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Users_Contract] ADD CONSTRAINT [Users_Contract_usersContract_userID_fkey] FOREIGN KEY ([usersContract_userID]) REFERENCES [dbo].[Users]([users_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Contract] ADD CONSTRAINT [Users_Contract_usersContract_statusID_fkey] FOREIGN KEY ([usersContract_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Users_Contract] ADD CONSTRAINT [Users_Contract_usersContract_communityID_fkey] FOREIGN KEY ([usersContract_communityID]) REFERENCES [dbo].[Community]([community_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
