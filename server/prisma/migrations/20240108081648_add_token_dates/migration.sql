BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Session] ADD [token_creationDate] DATETIME2,
[token_expirationDate] DATETIME2;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
