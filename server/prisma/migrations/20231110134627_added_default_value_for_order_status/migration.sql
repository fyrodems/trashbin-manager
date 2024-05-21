BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CardsBulk_Order] ADD CONSTRAINT [CardsBulk_Order_cardsBulkOrder_statusID_df] DEFAULT 3 FOR [cardsBulkOrder_statusID];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
