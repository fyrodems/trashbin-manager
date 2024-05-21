BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Card_Dumpsters] ADD [cardDumpsters_statusID] INT NOT NULL CONSTRAINT [Card_Dumpsters_cardDumpsters_statusID_df] DEFAULT 1;

-- AddForeignKey
ALTER TABLE [dbo].[Card_Dumpsters] ADD CONSTRAINT [Card_Dumpsters_cardDumpsters_statusID_fkey] FOREIGN KEY ([cardDumpsters_statusID]) REFERENCES [dbo].[Status]([status_ID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
