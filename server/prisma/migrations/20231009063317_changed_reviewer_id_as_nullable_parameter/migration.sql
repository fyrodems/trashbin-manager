BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Address_Applications] ALTER COLUMN [addressApplications_reviewedBy] INT NULL;

-- AlterTable
ALTER TABLE [dbo].[Cards_Applications] ALTER COLUMN [cardsApplications_reviewedBy] INT NULL;

-- AlterTable
ALTER TABLE [dbo].[Dumpsters_Applications] ALTER COLUMN [dumpstersApplications_reviewedBy] INT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
